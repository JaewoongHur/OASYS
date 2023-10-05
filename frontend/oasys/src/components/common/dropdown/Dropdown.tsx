/* import */
import { useState } from "react";
import styled from "@emotion/styled";
import Modal from "@components/modal/Modal";
import { RightArrow } from "@/assets/icons";

// ----------------------------------------------------------------------------------------------------
/* Props Type */
interface DropdownProps extends DropdownInputProps {
    placeholder: string;
    optionList: { name: string; value: number }[];
}
interface ArrowImageProps {
    rotate: boolean; // 사용자 지정 속성으로 선언
}
interface DropdownInputProps {
    width: string;
    height: string;
}

// ----------------------------------------------------------------------------------------------------
/* Style */
const DropDownContainer = styled("div")`
    cursor: pointer;
`;

const InputContainer = styled.div<DropdownInputProps>`
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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const DropDownInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding: 8px;
    cursor: pointer;
`;

const ArrowImage = styled("img")<ArrowImageProps>`
    width: 20px;
    height: 20px;
    margin-left: 10px;
    transition: transform 0.3s ease;
    transform: rotate(${(props) => (props.rotate ? "90deg" : "0deg")});
`;

const Option = styled("button")`
    width: 100%;
    height: 30%;
    background-color: #ffffff;
    color: ${(props) => props.theme.colors.gray7};
    font-size: 18px;
    margin-top: 10px;
    &:hover {
        border-radius: 20px;
        background-color: ${(props) => props.theme.colors.gray1};
        cursor: pointer;
    }
`;

// ----------------------------------------------------------------------------------------------------
/* Dropdown Component */
function Dropdown(props: DropdownProps) {
    const { placeholder, optionList, width, height } = props;
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string>("");

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const onClickOption = (name) => {
        setSelectedOption(name);
        setShowOptions(false);
    };

    return (
        <DropDownContainer>
            <InputContainer width={width} height={height} onClick={toggleOptions}>
                <DropDownInput readOnly value={selectedOption} placeholder={placeholder} />
                <ArrowImage src={RightArrow} alt="Arrow Icon" rotate={showOptions} />
            </InputContainer>
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
