/* import */
import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@components/modal/Modal";
import { ArrowUp, ArrowDown } from "@/assets/icons";
import { TextInput } from "../input";

// ----------------------------------------------------------------------------------------------------
/* Props Type */
interface DropdownProps {
    placeholder: string;
    optionList: { name: string; value: number }[];
}
// ----------------------------------------------------------------------------------------------------
/* Style */
const DropDownContainer = styled("div")`
    margin-top: 100px;
    margin-left: 100px;
    cursor: pointer;
`;

const Option = styled("button")`
    width: 100%;
    height: 30%;
    background-color: #ffffff;
    color: ${(props) => props.theme.colors.gray7};
    font-size: 24px;

    &:hover {
        border-radius: 20px;
        /* background-color: black; */
        background-color: ${(props) => props.theme.colors.gray1};
        cursor: pointer;
    }
`;

// ----------------------------------------------------------------------------------------------------
/* Dropdown Component */
function Dropdown(props: DropdownProps) {
    const { placeholder, optionList } = props;
    const [arrowIcon, setArrowIcon] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("");

    const toggleButton = () => {
        setArrowIcon(!arrowIcon);
    };

    const onClickOption = (name) => {
        setSelectedOption(name);
        setArrowIcon(false);
    };

    return (
        <DropDownContainer>
            <TextInput
                readOnly
                width="200px"
                value={selectedOption}
                placeholder={placeholder}
                inputIconSrc={arrowIcon ? ArrowUp : ArrowDown}
                onClick={toggleButton}
            />
            {arrowIcon && (
                <Modal
                    width="200px"
                    height="100px"
                    openModal={arrowIcon}
                    posX="100px"
                    posY="-40px"
                    overlayOn={false}
                >
                    {optionList.map((option) => (
                        <Option
                            value={option.value}
                            key={option.value}
                            onClick={() => onClickOption(option.name)}
                            disabled={option.name === selectedOption}
                        >
                            {option.name}
                        </Option>
                    ))}
                </Modal>
            )}
        </DropDownContainer>
    );
}
// ----------------------------------------------------------------------------------------------------

/* Export */
export default Dropdown;
