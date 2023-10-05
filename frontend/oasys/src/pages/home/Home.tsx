/* Import */
import postFace from "@api/faces";
import useRouter from "@hooks/useRouter";
import { useUserStore } from "@/store";
import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import socketIOClient from "socket.io-client";

// ----------------------------------------------------------------------------------------------------
const ENDPOINT = "http://127.0.0.1:4001";
/* Home Page */
function Home() {
    const webcamRef = useRef<Webcam | null>(null);
    const updateUserInfo = useUserStore((state) => state.updateUserState);
    const { routeTo } = useRouter();

    const [response, setResponse] = useState("");

    // communicate with express by socketIo
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromArduino", (data) => {
            console.log("data=" + data);
            setResponse(data);
        });
    }, []);

    function DataURIToBlob(dataURI: string) {
        const splitDataURI = dataURI.split(",");
        const byteString =
            splitDataURI[0].indexOf("base64") >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);

        return new Blob([ia], { type: mimeString });
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        async function fetchUserInfo() {
            const formData = new FormData();
            if (typeof imageSrc === "string") {
                const file = DataURIToBlob(imageSrc);
                formData.append("multipartFile", file);
            }

            await postFace({
                responseFunc: {
                    200: (response) => {
                        updateUserInfo(response?.data);
                        if (response?.data.senior) routeTo("/senior");
                        if (!response?.data.senior) routeTo("/junior");
                    },
                    400: () => {},
                },
                data: {
                    multipartFile: formData,
                },
            });
        }
        fetchUserInfo();
    }, [webcamRef, routeTo, updateUserInfo]);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={capture}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    capture();
                }
            }}
        >
            {response} // express socket response
            <iframe
                title="Background Video"
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/iVmb7XTmD1o?autoplay=1&controls=0&showinfo=0&rel=0&loop=1&playlist=iVmb7XTmD1o&mute=1"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: -1,
                }}
            />
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{ visibility: "hidden" }}
            />
        </div>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Home;
