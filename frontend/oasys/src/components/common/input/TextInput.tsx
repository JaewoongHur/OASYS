import { ChangeEvent } from "react";
import styled from "@emotion/styled";
import { InputProps } from "@customTypes/commonProps";

interface TextInputProps extends InputProps {
    label: string;
    name: string;
    placeholder: string;
    borderRadius: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

type InputContainerProps = {
    width: string;
    height: string;
};

type InputTagProps = {
    borderRadius: string;
};

const InputContainer = styled.div<InputContainerProps>`
    width: ${(props) => props.width || "auto"};
    height: ${(props) => props.height || "100%"};
`;

const Label = styled.label``;

const Input = styled.input<InputTagProps>`
    border-radius: ${(props) => props.borderRadius || "auto"};
`;

const Error = styled.div``;

export default function TextInput(props: TextInputProps) {
    const {
        type,
        label,
        value,
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
        <InputContainer width={width} height={height}>
            <Label>{label}</Label>
            <Input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange}
                borderRadius={borderRadius}
                disabled={disabled}
            />
            {error && <Error>빈 칸을 채우십시오.</Error>}
        </InputContainer>
    );
}
