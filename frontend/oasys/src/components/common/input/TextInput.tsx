import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

interface TextInputProps extends InputProps {
    label: string;
    name: string;
    placeholder: string;
    error: boolean;
    disabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type InputContainerProps = {
    width: string;
    height: string;
    borderRadius: string;
};

const InputContainer = styled.div<InputContainerProps>`
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "100%"};
    border-radius: ${(props) => props.borderRadius || "auto"};
`;

const Label = styled.label``;

const Input = styled.input``;

const Error = styled.div``;

export default function TextInput(props: TextInputProps) {
    const {
        type,
        label,
        name,
        placeholder,
        error,
        disabled,
        onChange,
        width,
        height,
        borderRadius,
    } = props;
    return (
        <InputContainer width={width} height={height} borderRadius={borderRadius}>
            <Label>{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                disabled={disabled}
                width={width}
            />
            {error && <Error>빈 칸을 채우십시오.</Error>}
        </InputContainer>
    );
}
