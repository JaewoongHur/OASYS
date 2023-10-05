import { useState, useRef, ChangeEvent } from "react";
import styled from "@emotion/styled";

interface FileInputProps {
    width: string;
    height?: string;
    onFileUpload: (file: File | null) => void;
}

const FileInputContainer = styled.div<{ width: string; height?: string }>`
    width: ${(props) => props.width};
    height: ${(props) => props.height || "50px"};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

const FileInputWrapper = styled.div`
    width: 75%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.gray1};
    border: 5px solid ${(props) => props.theme.colors.primary3};
    border-radius: 20px;
    color: ${(props) => props.theme.colors.gray7};
    font-weight: 700;
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

const FileNameInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    padding: 8px;
`;

const FileUploadButton = styled.label<{ fontSize: string }>`
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: ${(props) => props.theme.colors.primary3};
  font-weight: 700;
  font-size: ${(props) => props.fontSize};
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  transform-origin: center;
  user-select: none;
  outline: none;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    cursor: default;
    pointer-events: none;
    &:active {
      transform: scale(1);
    }
  }
}`;

function FileInput(props: FileInputProps) {
    const { width, height, onFileUpload } = props;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files && event.target.files[0];
        setSelectedFile(selected);
        onFileUpload(selected);
    };

    return (
        <FileInputContainer width={width} height={height}>
            <FileInputWrapper>
                <FileNameInput
                    readOnly
                    value={selectedFile ? selectedFile.name : ""}
                    placeholder="이미지를 첨부해주세요"
                />
            </FileInputWrapper>
            <FileUploadButton fontSize="18px">
                첨부
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
            </FileUploadButton>
        </FileInputContainer>
    );
}

export default FileInput;
