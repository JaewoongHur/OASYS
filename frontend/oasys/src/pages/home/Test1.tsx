import { useState } from "react";
import Modal from "@components/modal/Modal";
import { TextButton } from "@components/common/button";
import Dropdown from "@components/common/dropdown/Dropdown";
import { FileInput } from "@/components/common/input";

function Test1() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const optionList = [
        { name: "남성", value: 0 },
        { name: "여성", value: 1 },
    ];
    const onClickModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    const handleFileUpload = (file: File | null) => {
        setSelectedFile(file);
    };

    const handleSubmit = () => {
        if (selectedFile) {
            console.log("Uploading file:", selectedFile.name);
        }
    };
    return (
        <>
            <div>홈 페이지</div>
            <TextButton width="50%" onClick={onClickModal} text="OpenModal" />
            <Dropdown
                width="200px"
                height="50px"
                placeholder="선택하세요"
                optionList={optionList}
            />
            <br />
            <FileInput
                width="500px"
                placeholder="이미지를 첨부하세요"
                onFileUpload={handleFileUpload}
            />
            <button type="submit" onClick={handleSubmit}>
                등록
            </button>
            {isOpenModal && (
                <Modal
                    width="200px"
                    height="100px"
                    posX="0px"
                    posY="0px"
                    center
                    openModal={isOpenModal}
                    getModal={onClickModal}
                    overlayOn
                    position="absolute"
                >
                    <div>이곳에 children이 들어갑니다.</div>
                    <TextButton width="50%" height="50%" onClick={onClickModal} text="closeModal" />
                </Modal>
            )}
        </>
    );
}

export default Test1;
