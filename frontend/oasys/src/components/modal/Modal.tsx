/* import */
import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "@emotion/styled";
import Overlay from "@/components/common/overlay/Overlay";

// ----------------------------------------------------------------------------------------------------
/* Props Type */
interface ModalType {
    width: string;
    height: string;
    getModal?: () => void;
    openModal: boolean;
    posX: string;
    posY: string;
    center?: boolean;
}

// ----------------------------------------------------------------------------------------------------
/* Style */
const ModalContainer = styled("div")`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
`;
const ModalContent = styled("div")<ModalType>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    transform: translate(0%, 0%) ${(props) => (props.posX ? `translateX(${props.posX})` : "")}
        ${(props) => (props.posY ? `translateY(${props.posY})` : "")};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    border: none;
    border-radius: 20px;
    background-color: white;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    z-index: 10000;
`;

// ----------------------------------------------------------------------------------------------------
/* Modal Component */
function Modal({
    openModal,
    getModal,
    children,
    width,
    height,
    posX,
    posY,
    center,
}: PropsWithChildren<ModalType>) {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        if (openModal) {
            setTimeout(() => {
                setVisible(true);
            }, 115);
        } else {
            setVisible(false);
        }
    }, [openModal]);
    return (
        visible && (
            <ModalContainer>
                <ModalContent
                    width={width}
                    height={height}
                    openModal={openModal}
                    posX={posX}
                    posY={posY}
                    center={center}
                >
                    {children}
                </ModalContent>
                <Overlay
                    onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        if (getModal) {
                            getModal();
                        }
                    }}
                />
            </ModalContainer>
        )
    );
}
// ----------------------------------------------------------------------------------------------------

/* Export */
export default Modal;
