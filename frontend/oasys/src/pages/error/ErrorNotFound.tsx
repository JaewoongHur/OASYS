/* Import */
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Style */
const ErrorNotFoundContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Size Attribute
    width: 100%;
    height: 100vh;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.secondary};

    // Text Attribute
    color: white;

    // Interaction Attribute
    user-select: none;
`;

const ErrorCodeWrapper = styled("div")`
    // Style Attribute
    border-bottom: 3px solid white;

    // Text Attribute
    font-size: 300px;
    font-weight: 700;
`;

const ErrorMessageWrapper = styled("div")`
    // Size Attribute
    margin: 2em;

    // Text Attribute
    font-size: 30px;
    text-align: center;
    line-height: 160%;
`;

// ----------------------------------------------------------------------------------------------------

/* Not Found Error Page */
function ErrorNotFound() {
    const { routeTo } = useRouter();

    return (
        <ErrorNotFoundContainer>
            <ErrorCodeWrapper>404</ErrorCodeWrapper>
            <ErrorMessageWrapper>
                존재하지 않는 페이지입니다!
                <br />
                초기 화면으로 돌아가려면 아래의 버튼을 누르세요.
            </ErrorMessageWrapper>
            <TextButton
                width="30%"
                height="80px"
                text="초기 화면으로 돌아가기"
                fontSize="30px"
                onClick={() => routeTo("/")}
            />
        </ErrorNotFoundContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default ErrorNotFound;
