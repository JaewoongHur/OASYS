import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

interface TextAreaProps extends InputProps {
    id: string;
}

type TextAreaContainerProps = {
    width: string;
    height: string;
};

type TextAreaTagProps = { width: string; height: string };

const TextAreaContainer = styled.div<TextAreaContainerProps>`
    width: ${(props) => props.width || "100px"};
    height: ${(props) => props.height || "300px"};
    max-height: "1000px";
`;

const TextAreaTag = styled.textarea<TextAreaTagProps>`
    width: ${(props) => props.width || "100px"};
    height: ${(props) => props.height || "300px"};
    resize: none;
    border: 10px solid transparent;
    // background-color: transparent;
`;

const Error = styled.div``;

export default function TextArea(props: TextAreaProps) {
    const { id, error, disabled, value, width, height } = props;
    return (
        <TextAreaContainer width={width} height={height}>
            <TextAreaTag id={id} width={width} height={height} disabled={disabled} value={value}>
                {error && <Error>빈 칸을 채우십시오.</Error>}
            </TextAreaTag>
        </TextAreaContainer>
    );
}
