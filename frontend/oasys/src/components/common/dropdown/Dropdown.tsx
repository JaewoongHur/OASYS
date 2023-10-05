/* import */
import { DropdownProps } from "@customTypes/componentTypes";
import Modal from "@components/modal/Modal";
import { RightArrow } from "@assets/icons";
import styled from "@emotion/styled";
import { useState } from "react";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface DropdownInputProps {
    width: string;
    height: string;
}

interface ArrowImageProps {
    rotate: boolean;
}

// ----------------------------------------------------------------------------------------------------
/* Style */
const DropDownContainer = styled("div")`
    // Interaction Attribute
    cursor: pointer;
`;

const DropDownInputContainer = styled("div")<DropdownInputProps>`
    // Position Attribute
    display: flex;
    align-items: center;
    justify-content: space-between;

    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    padding: 10px;
    box-sizing: border-box;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};
    border: 5px solid ${(props) => props.theme.colors.primary3};
    border-radius: 20px;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-weight: 700;

    // Interaction Attribute
    transition: 0.3s;
    outline: none;
    :focus {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
    }
`;

const DropDownInput = styled("input")`
    // Size Attribute
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;

    // Style Attribute
    background-color: transparent;
    border: none;
    outline: none;
`;

const ArrowImage = styled("img")<ArrowImageProps>`
    // Size Attribute
    width: 20px;
    height: 20px;
    margin-left: 10px;

    // Interaction Attribute
    transition: transform 0.3s ease;
    transform: rotate(${(props) => (props.rotate ? "90deg" : "0deg")});
`;

const Option = styled("button")`
    // Size Attribute
    width: 100%;
    height: 30%;
    margin-top: 10px;

    // Style Attribute
    background-color: white;

    // Text Attribute
    color: ${(props) => props.theme.colors.gray7};
    font-size: 18px;

    // Interaction Attribute
    &:hover {
        border-radius: 20px;
        background-color: ${(props) => props.theme.colors.gray1};
        cursor: pointer;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Dropdown Component */
function Dropdown(props: DropdownProps) {
    const { width, height, placeholder, optionList } = props;
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("");

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const onClickOption = (name: string) => {
        setSelectedOption(name);
        setShowOptions(false);
    };

    return (
        <DropDownContainer>
            <DropDownInputContainer width={width} height={height} onClick={toggleOptions}>
                <DropDownInput readOnly value={selectedOption} placeholder={placeholder} />
                <ArrowImage src={RightArrow} alt="Arrow-Icon" rotate={showOptions} />
            </DropDownInputContainer>
            {showOptions && (
                <Modal
                    width="70%"
                    height="100px"
                    openModal={showOptions}
                    posX="160px"
                    posY="-48px"
                    overlayOn={false}
                    position="absolute"
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
