import { useState } from "react";
import { TextButton } from "@/components/common/button";
import styled from "@emotion/styled";
import Modal from "@components/modal/Modal";
// import Dropdown from "@/components/common/dropdown";
import { FileInput, TextInput } from "@/components/common/input";
import Dropdown from "@/components/common/dropdown";

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
            faceId: "test6",
            subId: "a",
            name: "John Doe5",
        },
        waitingConsumerCount: 5,
        waitingConsumerList: [
            {
                faceId: "test1",
                subId: "b",
                name: "고건",
            },
            {
                faceId: "test2",
                subId: "c",
                name: "정연수",
            },
            {
                faceId: "test3",
                subId: "b",
                name: "고건",
            },
            {
                faceId: "test4",
                subId: "c",
                name: "정연수",
            },
            {
                faceId: "test9",
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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [registModalOpen, setRegistModalOpen] = useState<boolean>(false);
    const [memberModalOpen, setMemberModalOpen] = useState<boolean>(false);
    const [selectedQueueIndex, setSelectedQueueIndex] = useState<number>(-1);
    const [selectedMemberSubId, setSelectedMemberSubId] = useState<number>(-1);
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
        setSelectedFile(file);
    };
    const handleSubmit = () => {
        if (selectedFile) {
            console.log("Uploading file:", selectedFile.name);
        }
        // 데이터 post 요청
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
    const handleMemberInfoClick = (subId) => {
        // subId를 기반으로 고객 정보 조회 API 호출 또는 상태 업데이트 등을 수행
        // 조회된 정보를 모달에 표시하기 위한 상태를 업데이트
        setSelectedMemberSubId(subId); // 예시: 조회된 고객의 subId를 상태로 저장
        const a = selectedMemberSubId;
        console.log(a);
        // 정보 조회 모달 열기
        setMemberModalOpen(true);
    };
    const renderMemberModalContent = () => {
        // 선택된 고객의 subId를 사용하여 해당 고객 정보를 가져오는 로직을 추가
        // const selectedMemberInfo = getMemberInfoBySubId(selectedMemberSubId);
        // API로 정보 가져오기

        // 모달 내용을 반환
        return (
            // <div>
            //     {/* 고객 정보를 출력하는 컴포넌트를 구현 */}
            //     {/* <div>고객 이름: {selectedMemberInfo?.name}</div>
            //     <div>고객 전화번호: {selectedMemberInfo?.phone}</div> */}
            //     {/* 기타 정보 표시 */}
            // </div>
            <InfoContainer>
                <InfoHeader>서비스 회원 정보</InfoHeader>
                <InfoMemberWrapper>
                    <MemberNameContainer>
                        <TextInput readOnly width="100%" label="이름" value={name} />
                    </MemberNameContainer>
                    <IsMemberContainer>
                        <TextInput readOnly width="100%" label="회원 여부" value="회원" />
                    </IsMemberContainer>
                </InfoMemberWrapper>
                <PhoneContainer>
                    <TextInput readOnly width="100%" label="전화번호" value={phone} />
                </PhoneContainer>
                <AgeContainer>
                    <TextInput readOnly width="100%" label="나이" value={age} />
                </AgeContainer>
                <GenderContainer>
                    <GenderWrapper>
                        <GenderLabel htmlFor="gender">성별</GenderLabel>
                    </GenderWrapper>
                    <TextInput readOnly width="100%" value="남성" />
                </GenderContainer>
                <WorkContainer>
                    <TextInput readOnly width="100%" label="업무 내용" value="금융 상품 가입" />
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
            const queue = queueData[selectedQueueIndex];
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
                            <BankTellerCustomerName
                                onClick={() =>
                                    handleMemberInfoClick(queue.consultingCustomer?.subId)
                                }
                            >
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
                                        <WaitingConsumer
                                            key={consumer?.faceId || `empty-${i}`}
                                            onClick={() => handleMemberInfoClick(consumer?.subId)}
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
                <TextButton
                    width="19%"
                    text="서비스 회원 등록"
                    onClick={() => setRegistModalOpen(true)}
                />
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
        </Div>
    );
}

export default AdminMain;
