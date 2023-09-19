import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

interface TextAreaProps extends InputProps {
    text: string;
}

type TextAreaContainerProps = {
    width: string;
    height: string;
    borderRadius: string;
};

const TextAreaContainer = styled.textarea<TextAreaContainerProps>`
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "100%"};
    border-radius: ${(props) => props.borderRadius || "auto"};
`;

const Error = styled.div``;

export default function TextArea(props: TextAreaProps) {
    const { error, disabled, text, width, height, borderRadius } = props;
    return (
        <TextAreaContainer
            width={width}
            height={height}
            borderRadius={borderRadius}
            disabled={disabled}
        >
            여기에 TTS 텍스트가 들어갑니다.
            {text}
            {error && <Error>빈 칸을 채우십시오.</Error>}
        </TextAreaContainer>
    );
}
