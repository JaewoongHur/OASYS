import { useState } from "react";
import Modal from "@components/modal/Modal";
import { TextButton } from "@components/common/button";
import Dropdown from "@components/common/dropdown/Dropdown";

function Test1() {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const optionList = [
        { name: "남성", value: 0 },
        { name: "여성", value: 1 },
    ];
    const onClickModal = () => {
        setIsOpenModal((prev) => !prev);
    };

    return (
        <>
            <div>홈 페이지</div>
            <TextButton width="50%" onClick={onClickModal} text="OpenModal" />
            <Dropdown placeholder="선택하세요" optionList={optionList} />
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
                >
                    <div>이곳에 children이 들어갑니다.</div>
                    <TextButton width="50%" height="50%" onClick={onClickModal} text="closeModal" />
                </Modal>
            )}
        </>
    );
}

export default Test1;
