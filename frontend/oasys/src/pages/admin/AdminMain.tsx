import { useState } from "react";
import { TextButton } from "@/components/common/button";
import styled from "@emotion/styled";
import Modal from "@components/modal/Modal";

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
const Div = styled("div")``;
const MainContainer = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    margin-top: 70px;
`;

const ButtonContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    height: 30%;
    max-height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const TextButton2 = styled("div")<TextButton2Props>`
    // Size Attribute
    width: ${(props) => props.width};
    height: ${(props) => props.height};
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
    height: 80%;
`;

const BankTellerWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 4px solid ${(props) => props.theme.colors.gray7};
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
`;

const BankTellerHeader = styled("div")`
    font-size: 36px;
    font-weight: 900;
    height: 15%;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
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
    height: 70%;
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
    margin-top: 20px;
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
    padding-top: 10px;
    padding-bottom: 10px;
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
`;
const WaitingConsumer2 = styled("div")`
    font-size: 24px;
    font-weight: 900;
    margin-top: 10px;
    margin-bottom: 10px;
`;
const ScrollWaitingContainer = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    width: 100%;
`;

const queueListData: ConsultingData[] = [
    {
        tellerTypeId: 1,
        tellerTypeName: "통장 · 계좌",
        consultingCustomer: {
            faceId: "test5",
            subId: "a",
            name: "John Doe5",
        },
        waitingConsumerCount: 0,
        waitingConsumerList: [],
        consulting: true,
    },
    {
        tellerTypeId: 2,
        tellerTypeName: "카드",
        consultingCustomer: {
            faceId: "test5",
            subId: "a",
            name: "John Doe5",
        },
        waitingConsumerCount: 5,
        waitingConsumerList: [
            {
                faceId: "test5",
                subId: "b",
                name: "고건",
            },
            {
                faceId: "test5",
                subId: "c",
                name: "정연수",
            },
            {
                faceId: "test5",
                subId: "b",
                name: "고건",
            },
            {
                faceId: "test5",
                subId: "c",
                name: "정연수",
            },
            {
                faceId: "test5",
                subId: "c",
                name: "정연수",
            },
        ],
        consulting: true,
    },
    {
        tellerTypeId: 3,
        tellerTypeName: "인터넷뱅킹",
        consultingCustomer: null,
        waitingConsumerCount: 0,
        waitingConsumerList: [],
        consulting: false,
    },
    {
        tellerTypeId: 4,
        tellerTypeName: "대출 · 외환",
        consultingCustomer: null,
        waitingConsumerCount: 0,
        waitingConsumerList: [],
        consulting: false,
    },
];

function AdminMain() {
    const [consultingCounts, setConsultingCounts] = useState<number[]>([
        queueListData[0].waitingConsumerCount,
        queueListData[1].waitingConsumerCount,
        queueListData[2].waitingConsumerCount,
        queueListData[3].waitingConsumerCount,
    ]);
    const [queueData, setQueueData] = useState<ConsultingData[]>(queueListData);
    const handleQueue = (index: number) => {
        const updatedQueueData = [...queueData];
        const queue = updatedQueueData[index];

        // consultingCustomer 변경 및 첫 번째 대기자 삭제
        if (queue.consulting && queue.waitingConsumerList.length >= 0) {
            const [firstConsumer, ...remainingConsumers] = queue.waitingConsumerList;
            queue.consultingCustomer = firstConsumer;
            queue.waitingConsumerList = remainingConsumers;
            setConsultingCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts[index] = Math.max(newCounts[index] - 1, 0);
                return newCounts;
            });

            setQueueData(updatedQueueData);
        }
    };
    const register = () => {
        // 서비스 회원 등록 로직 추가
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedQueueIndex, setSelectedQueueIndex] = useState<number>(-1);

    // 모달 내용을 동적으로 생성하는 함수
    const renderModalContent = () => {
        if (selectedQueueIndex !== -1) {
            const queue = queueData[selectedQueueIndex];
            return (
                <AllWaitingConsumer>
                    <ScrollWaitingContainer>
                        {queue.waitingConsumerList.map((consumer) => (
                            <WaitingConsumer2 key={consumer.faceId}>
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
        <Div>
            <MainContainer>
                {queueData.map((queue, index) => (
                    <BankTellerContainer key={queue.tellerTypeId}>
                        <BankTellerWrapper>
                            <BankTellerHeader>{`${queue.tellerTypeId}번 창구`}</BankTellerHeader>
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
                            <BankTellerCustomerName>
                                {queue.consultingCustomer ? queue.consultingCustomer.name : "없음"}
                            </BankTellerCustomerName>
                            <ButtonContainer>
                                {queue.consulting ? (
                                    <TextButton
                                        width="100%"
                                        text="상담 완료"
                                        onClick={() => handleQueue(index)}
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
                                        <WaitingConsumer key={consumer?.faceId || `empty-${i}`}>
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
                                    <TextButton2 width="80%" height="25%" fontSize="20px">
                                        대기열 더 보기
                                    </TextButton2>
                                )}
                            </BankQueueList>
                        </BankQueueWrapper>
                    </BankTellerContainer>
                ))}
            </MainContainer>
            <ButtonContainer>
                <TextButton width="19%" text="서비스 회원 등록" onClick={register} />
            </ButtonContainer>
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
        </Div>
    );
}

export default AdminMain;
