import postFace from "@/api/face";
import { UserState } from "@/customTypes/storeTypes";
import useUserStore from "@/store";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

function SeniorPhone() {
    const webcamRef = useRef<Webcam | null>(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [userInfo, setUserInfo] = useState<UserState>(useUserStore());

    async function fetchUserInfo() {
        const formData = new FormData();
        formData.append("userPic", imgSrc);
        await postFace({
            responseFunc: {
                200: (response) => {
                    if (response) setUserInfo(response.data);
                },
                400: () => {},
            },
            data: {
                userPic: formData,
            },
        });
    }

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        setImgSrc(imageSrc);
        console.log(imageSrc);
        fetchUserInfo();
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button type="button" onClick={capture}>
                Capture photo
            </button>
            {imgSrc && <img src={imgSrc} alt="캡처 이미지" />}
        </>
    );
}

export default SeniorPhone;
