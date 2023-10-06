/* Import */
import { Alert } from "@assets/icons";
import Modal from "@components/modal";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";

// ----------------------------------------------------------------------------------------------------

/* Props Type */
interface AdminLoginModalProps {
    openModal: boolean;
    getModal: () => void;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const ContentContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // Size Attribute
    width: 100%;
    height: 100%;
    padding: 3em 5em;
`;

const HeaderContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;

    // Size Attribute
    width: 100%;
`;

const IconWrapper = styled("img")`
    // Size Attribute
    width: 40px;
`;

const TitleWrapper = styled("div")`
    // Text Attribute
    font-size: 40px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary3};
`;

const DescriptionWrapper = styled("div")`
    // Size Attribute
    margin-bottom: 1em;

    // Text Attribute
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.gray7};
`;

const ButtonWrapper = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: center;

    // Size Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------

/* Admin Login Modal */
function AdminLoginModal(props: AdminLoginModalProps) {
    const { openModal, getModal } = props;

    return (
        <Modal
            width="auto"
            height="auto"
            posX="0px"
            posY="0px"
            center
            openModal={openModal}
            overlayOn
            position="fixed"
            getModal={getModal}
        >
            <ContentContainer>
                <HeaderContainer>
                    <IconWrapper src={Alert} alt="Alert-Icon" />
                    <TitleWrapper>로그인 실패</TitleWrapper>
                </HeaderContainer>
                <DescriptionWrapper>아이디 또는 비밀번호가 일치하지 않습니다.</DescriptionWrapper>
                <ButtonWrapper>
                    <TextButton width="35%" text="확인" onClick={getModal} />
                </ButtonWrapper>
            </ContentContainer>
        </Modal>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdminLoginModal;
