/* Import */
import Dropdown from "@components/common/dropdown";
import { FileInput, TextInput } from "@components/common/input";
import styled from "@emotion/styled";
import { TextButton } from "@components/common/button";
import Modal from "@components/modal";
import { useState, useEffect } from "react";

// ----------------------------------------------------------------------------------------------------

type ResponseMember = {
    faceId: string;
    subId: string;
    name: string;
    phone: string;
    cateTypeName: string;
    isMember: boolean;
    age: number;
    userId: number;
    gender: string;
};

interface TextButton2Props {
    width: string;
    height: string;
    fontSize: string;
}

interface ConsultingData {
    tellerTypeId: number;
    tellerTypeName: string;
    consultingCustomer: {
        faceId: string;
        subId: string;
        name: string;
    } | null;
    waitingConsumerCount: number;
    waitingConsumerList: {
        faceId: string;
        subId: string;
        name: string;
    }[];
    consulting: boolean;
}

// ----------------------------------------------------------------------------------------------------

/* Style */
const Container = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 56px;
    width: 100vw;
    height: calc(100vh - 56px);
`;

const MainContainer = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    height: 100%;
    margin: 0 auto;
    margin-top: 25px;
`;

const ButtonContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    height: 30%;
    max-height: 50px;
    margin-bottom: 10px;
`;

const TextButton2 = styled("div")<TextButton2Props>`
    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    max-height: 50px;
    padding: 10px 20px;
    box-sizing: border-box;

    // Style Attribute
    border-radius: 20px;
    border: 5px solid transparent;
    background-color: ${(props) => props.theme.colors.gray3};
    text-align: center;
    // Text Attribute
    font-weight: 700;
    font-size: ${(props) => props.fontSize};
    color: #ffffff;
    // Interaction Attribute
    transition: 0.3s;
    transform-origin: center;
    user-select: none;
    outline: none;
`;

const BankTellerContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20%;
    height: 92%;
`;

const BankTellerWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 4px solid ${(props) => props.theme.colors.gray7};
    width: 100%;
    height: 100%;
`;

const BankTellerHeader = styled("div")`
    font-size: 36px;
    font-weight: 900;
    height: 15%;
    margin: 0 auto;
    cursor: pointer;
`;

const BankDepartment = styled("div")`
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto;
    padding-bottom: 15px;
`;

const BankStatus = styled("div")`
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto;
    padding-top: 15px;
    padding-bottom: 5px;
`;

const GreenMark = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin: 0 auto;
    padding-bottom: 5px;
    color: ${(props) => props.theme.colors.secondary};
`;

const OrangeMark = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin: 0 auto;
    padding-bottom: 5px;
    color: ${(props) => props.theme.colors.primary3};
`;

const BankTellerCustomer = styled("div")`
    font-size: 18px;
    font-weight: 500;
    margin: 0 auto;
    padding-top: 15px;
`;

const BankTellerCustomerName = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin: 0 auto;
    padding-top: 10px;
`;

const BankQueueWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 4px solid ${(props) => props.theme.colors.gray7};
    width: 100%;
    height: 100%;
    font-size: 18px;
`;

const BankQueueHeader = styled("div")`
    background-color: ${(props) => props.theme.colors.gray7};
    color: #ffffff;
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: space-evenly;
`;

const BankList = styled("div")`
    font-size: 18px;
    font-weight: 700;
`;

const BankPeopleNumber = styled("div")`
    font-size: 18px;
    font-weight: 700;
`;

const DivisionLine = styled("div")`
    border: 2px solid ${(props) => props.theme.colors.gray7};
    width: 80%;
    margin: 0 auto;
`;
const BankQueueList = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
`;
const AllWaitingConsumer = styled("div")`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;
const WaitingConsumer = styled("div")`
    font-size: 24px;
    font-weight: 900;
    cursor: pointer;
`;
const WaitingConsumer2 = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
`;
const ScrollWaitingContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: 100%;
`;
const RegisterContainer = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;
const RegisterHeader = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const NameContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
`;
const PhoneContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
`;
const AgeContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
`;

const GenderContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
`;
const GenderWrapper = styled("div")``;
const GenderLabel = styled("label")`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary3};
`;
const FileContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
`;
const FileWrapper = styled("div")`
    margin-bottom: 10px;
`;
const FileLabel = styled("label")`
    font-size: 18px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.primary3};
`;
const RegisterButtonContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const InfoContainer = styled("div")`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;
const InfoHeader = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const InfoMemberWrapper = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
const MemberNameContainer = styled("div")`
    margin-bottom: 10px;
    margin-right: 30px;
`;
const IsMemberContainer = styled("div")`
    margin-bottom: 10px;
`;
const WorkContainer = styled("div")`
    display: flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 20px;
`;
const InfoButtonContainer = styled("div")`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

// ----------------------------------------------------------------------------------------------------

/* Admin Main Component */
function AdminMain() {
    const [queueListData, setQueueListData] = useState<ConsultingData[]>([]);
    const [consultingCounts, setConsultingCounts] = useState<number[]>([0, 0, 0, 0]);
    const [selectedMemberInfo, setSelectedMemberInfo] = useState<ResponseMember | null>(null);

    const fetchConsultingData = async () => {
        try {
            const response = await fetch("/manager/teller/list");

            if (!response.ok) {
                throw new Error("Failed to fetch consulting data");
            }

            const data: ConsultingData[] = await response.json();

            setQueueListData(data);

            setConsultingCounts([
                data[0]?.waitingConsumerCount || 0,
                data[1]?.waitingConsumerCount || 0,
                data[2]?.waitingConsumerCount || 0,
                data[3]?.waitingConsumerCount || 0,
            ]);
        } catch (error) {
            throw new Error("Error fetching consulting data");
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchConsultingData();
    }, []);

    const handleQueueDEL = async (index: number) => {
        try {
            const responseDEL = await fetch(
                `/manager/consulting/${queueListData[index].tellerTypeId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!responseDEL.ok) {
                throw new Error("Failed to dequeue the consumer");
            }

            fetchConsultingData();
        } catch (error) {
            throw new Error("Error dequeuing consumer");
        }
    };

    const handleQueuePUT = async (index: number) => {
        try {
            // Make the PUT request to get the next customer for consultation
            const responsePUT = await fetch(
                `/manager/consulting/${queueListData[index].tellerTypeId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!responsePUT.ok) {
                throw new Error("Failed to get the next customer for consultation");
            }

            // After a successful API call, fetch the updated list of consumers
            fetchConsultingData();

            const responseCALL = await fetch("http://localhost:8081/api/v1/notification/call", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!responseCALL.ok) {
                throw new Error("Failed to call");
            }
        } catch (error) {
            throw new Error("Error calling to consumer");
        }
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [registModalOpen, setRegistModalOpen] = useState<boolean>(false);
    const [memberModalOpen, setMemberModalOpen] = useState<boolean>(false);
    const [selectedQueueIndex, setSelectedQueueIndex] = useState<number>(-1);
    // const [selectedMemberSubId, setSelectedMemberSubId] = useState<number>(-1);
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const genderOptionList = [
        { name: "남성", value: 0 },
        { name: "여성", value: 1 },
    ];
    const handlePhoneChange = (e) => {
        if (e.target.value.length <= 10) {
            setPhone(e.target.value);
        }
    };
    const handleAgeChange = (e) => {
        if (e.target.value.length <= 3) {
            setAge(e.target.value);
        }
    };
    const handleFileUpload = (file: File | null) => {
        if (!selectedFile) setSelectedFile(file);
    };
    const handleSubmit = () => {
        setRegistModalOpen(false);
    };
    const closeRegistModal = () => {
        setRegistModalOpen(false);
    };

    const registerModalContent = () => {
        return (
            <RegisterContainer>
                <RegisterHeader>서비스 회원 등록</RegisterHeader>
                <NameContainer>
                    <TextInput
                        width="100%"
                        label="이름"
                        value={name}
                        placeholder="이름을 입력하세요."
                        onChange={(e) => setName(e.target.value)}
                    />
                </NameContainer>
                <PhoneContainer>
                    <TextInput
                        width="100%"
                        type="number"
                        label="전화번호"
                        value={phone}
                        placeholder="01012345678의 형식으로 입력하세요."
                        onChange={handlePhoneChange}
                    />
                </PhoneContainer>
                <AgeContainer>
                    <TextInput
                        width="100%"
                        type="number"
                        label="나이"
                        value={age}
                        placeholder="나이를 입력하세요."
                        onChange={handleAgeChange}
                    />
                </AgeContainer>
                <GenderContainer>
                    <GenderWrapper>
                        <GenderLabel htmlFor="gender">성별</GenderLabel>
                    </GenderWrapper>
                    <Dropdown
                        width="100%"
                        height="80%"
                        placeholder="성별을 선택하세요."
                        optionList={genderOptionList}
                    />
                </GenderContainer>
                <FileContainer>
                    <FileWrapper>
                        <FileLabel htmlFor="gender">얼굴 이미지</FileLabel>
                    </FileWrapper>
                    <FileInput
                        width="100%"
                        placeholder="이미지를 첨부하세요."
                        onFileUpload={handleFileUpload}
                    />
                </FileContainer>
                <RegisterButtonContainer>
                    <TextButton type="submit" width="45%" text="등록" onClick={handleSubmit} />
                    <TextButton
                        width="45%"
                        text="취소"
                        category="negative"
                        onClick={closeRegistModal}
                    />
                </RegisterButtonContainer>
            </RegisterContainer>
        );
    };
    const handleMemberInfoClick = async (faceId) => {
        // subId를 기반으로 고객 정보 조회 API 호출 또는 상태 업데이트 등을 수행
        // 조회된 정보를 모달에 표시하기 위한 상태를 업데이트
        const responseUSER = await fetch(`/manager/consumer/${faceId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!responseUSER.ok) {
            throw new Error("Failed to get the next customer for consultation");
        }

        const data: ResponseMember = await responseUSER.json();
        setSelectedMemberInfo(data);
        setMemberModalOpen(true);
    };
    const renderMemberModalContent = () => {
        return (
            <InfoContainer>
                <InfoHeader>서비스 회원 정보</InfoHeader>
                <InfoMemberWrapper>
                    <MemberNameContainer>
                        <TextInput
                            readOnly
                            width="100%"
                            label="이름"
                            value={selectedMemberInfo?.name || ""}
                        />
                    </MemberNameContainer>
                    <IsMemberContainer>
                        <TextInput
                            readOnly
                            width="100%"
                            label="회원 여부"
                            value={selectedMemberInfo?.isMember ? "회원" : "비회원"}
                        />
                    </IsMemberContainer>
                </InfoMemberWrapper>
                <PhoneContainer>
                    <TextInput
                        readOnly
                        width="100%"
                        label="전화번호"
                        value={selectedMemberInfo?.phone || ""}
                    />
                </PhoneContainer>
                <AgeContainer>
                    <TextInput
                        readOnly
                        width="100%"
                        label="나이"
                        value={selectedMemberInfo?.age.toString() || ""}
                    />
                </AgeContainer>
                <GenderContainer>
                    <GenderWrapper>
                        <GenderLabel htmlFor="gender">성별</GenderLabel>
                    </GenderWrapper>
                    <TextInput readOnly width="100%" value={selectedMemberInfo?.gender || ""} />
                </GenderContainer>
                <WorkContainer>
                    {/* I'm not sure where the work data comes from, so I left it as it was */}
                    <TextInput
                        readOnly
                        width="100%"
                        label="업무 내용"
                        value={selectedMemberInfo?.cateTypeName || ""}
                    />
                </WorkContainer>
                <InfoButtonContainer>
                    <TextButton width="40%" text="확인" onClick={() => setMemberModalOpen(false)} />
                </InfoButtonContainer>
            </InfoContainer>
        );
    };

    // 모달 내용을 동적으로 생성하는 함수
    const renderModalContent = () => {
        if (selectedQueueIndex !== -1) {
            const queue = queueListData[selectedQueueIndex];
            return (
                <AllWaitingConsumer>
                    <ScrollWaitingContainer>
                        {queue.waitingConsumerList.map((consumer) => (
                            <WaitingConsumer2
                                key={consumer.faceId}
                                onClick={() => handleMemberInfoClick(consumer?.subId)}
                            >
                                {consumer.name}
                            </WaitingConsumer2>
                        ))}
                    </ScrollWaitingContainer>
                    <TextButton2
                        width="80%"
                        height="50px"
                        fontSize="20px"
                        onClick={() => setIsModalOpen(false)}
                    >
                        닫기
                    </TextButton2>
                </AllWaitingConsumer>
            );
        }
        return null;
    };

    // 모달 열기 함수
    const openModal = (index: number) => {
        setSelectedQueueIndex(index);
        setIsModalOpen(true);
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setSelectedQueueIndex(-1);
        setIsModalOpen(false);
    };

    return (
        <>
            <Container>
                <MainContainer>
                    {queueListData.map((queue, index) => (
                        <BankTellerContainer key={queue.tellerTypeId}>
                            <BankTellerWrapper>
                                <BankTellerHeader
                                    onClick={() => handleQueuePUT(index)}
                                >{`${queue.tellerTypeId}번 창구`}</BankTellerHeader>
                                <BankDepartment>{queue.tellerTypeName}</BankDepartment>
                                <DivisionLine />
                                <BankStatus>창구 상태</BankStatus>
                                {queue.consulting ? (
                                    <OrangeMark>상담 중</OrangeMark>
                                ) : (
                                    <GreenMark>대기 중</GreenMark>
                                )}
                                <DivisionLine />
                                <BankTellerCustomer>창구 고객</BankTellerCustomer>
                                <BankTellerCustomerName
                                    onClick={() =>
                                        handleMemberInfoClick(queue.consultingCustomer?.faceId)
                                    }
                                >
                                    {queue.consultingCustomer
                                        ? queue.consultingCustomer.name
                                        : "없음"}
                                </BankTellerCustomerName>
                                <ButtonContainer>
                                    {queue.consulting ? (
                                        <TextButton
                                            width="100%"
                                            text="상담 완료"
                                            onClick={() => handleQueueDEL(index)}
                                        />
                                    ) : (
                                        <TextButton2 width="100%" height="100%" fontSize="20px">
                                            상담 완료
                                        </TextButton2>
                                    )}
                                </ButtonContainer>
                            </BankTellerWrapper>
                            <BankQueueWrapper>
                                <BankQueueHeader>
                                    <BankList>창구 대기열</BankList>
                                    <BankPeopleNumber>{consultingCounts[index]}명</BankPeopleNumber>
                                </BankQueueHeader>
                                <BankQueueList>
                                    {Array.from({ length: 3 }).map((_, i) => {
                                        const consumer = queue.waitingConsumerList[i];
                                        return (
                                            <WaitingConsumer
                                                key={consumer?.faceId || `empty-${i}`}
                                                onClick={() =>
                                                    handleMemberInfoClick(consumer?.faceId)
                                                }
                                            >
                                                {consumer ? consumer.name : ""}
                                            </WaitingConsumer>
                                        );
                                    })}
                                    {queue.waitingConsumerList.length > 3 ? (
                                        <TextButton
                                            width="80%"
                                            height="25%"
                                            text="대기열 더 보기"
                                            onClick={() => openModal(index)}
                                        />
                                    ) : (
                                        <TextButton2 width="80%" height="50px" fontSize="20px">
                                            대기열 더 보기
                                        </TextButton2>
                                    )}
                                </BankQueueList>
                            </BankQueueWrapper>
                        </BankTellerContainer>
                    ))}
                </MainContainer>
                <ButtonContainer>
                    <TextButton
                        width="19%"
                        text="서비스 회원 등록"
                        onClick={() => setRegistModalOpen(true)}
                    />
                </ButtonContainer>
            </Container>
            {isModalOpen && (
                <Modal
                    width="300px"
                    height="400px"
                    posX="0px"
                    posY="0px"
                    center
                    openModal={isModalOpen}
                    overlayOn
                    position="fixed"
                    getModal={closeModal}
                >
                    {renderModalContent()}
                </Modal>
            )}
            {memberModalOpen && (
                <Modal
                    width="430px"
                    height="610px"
                    posX="0px"
                    posY="0px"
                    center
                    openModal={memberModalOpen}
                    overlayOn
                    position="fixed"
                    getModal={() => setMemberModalOpen(false)}
                >
                    {renderMemberModalContent()}
                </Modal>
            )}
            {registModalOpen && (
                <Modal
                    width="430px"
                    height="610px"
                    posX="0px"
                    posY="0px"
                    center
                    openModal={registModalOpen}
                    overlayOn
                    position="fixed"
                    getModal={() => setRegistModalOpen(false)}
                >
                    {registerModalContent()}
                </Modal>
            )}
        </>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default AdminMain;
