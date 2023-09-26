import { useState } from "react";
import Modal from "@/components/modal/Modal";
import { TextButton } from "@/components/common/button";

function Test1() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const onClickModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    return (
        <>
            <div>홈 페이지</div>
            {isOpenModal && (
                <Modal
                    width="500px"
                    height="100px"
                    posX="100px"
                    posY="100px"
                    openModal={isOpenModal}
                    getModal={onClickModal}
                >
                    <div>이곳에 children이 들어갑니다.</div>
                    <TextButton width="50%" height="50%" onClick={onClickModal} text="closeModal" />
                </Modal>
            )}
            <TextButton width="50%" onClick={onClickModal} text="OpenModal" />
        </>
    );
}

export default Test1;
