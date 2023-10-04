import { TextButton } from "@/components/common/button";
import styled from "@emotion/styled";
import { useState } from "react";

interface TextButton2Props {
    width: string;
    height: string;
    fontSize: string;
}

const MainContainer = styled("div")`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 90vw;
    height: 100vh;
    margin: 0 auto;
    margin-top: 100px;
`;
const ButtonContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    margin-top: 30px;
    margin-bottom: 30px;
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
    height: 100%;
`;
const BankTellerWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 4px solid ${(props) => props.theme.colors.gray7};
    width: 100%;
    height: 100%;
    margin-top: 40px;
    margin-bottom: 10px;
`;
const BankTellerHeader = styled("div")`
    font-size: 48px;
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
    font-size: 36px;
    font-weight: 900;
    margin: 0 auto;
    padding-bottom: 5px;
    color: ${(props) => props.theme.colors.secondary};
`;
const OrangeMark = styled("div")`
    font-size: 36px;
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
    font-size: 32px;
    font-weight: 900;
    margin: 0 auto;
    padding-top: 5px;
`;
const BankQueueWrapper = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 4px solid ${(props) => props.theme.colors.gray7};
    width: 100%;
    height: 80%;
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
function AdminMain() {
    const [consulting1, setConsulting1] = useState<number>(4);
    const [consulting2, setConsulting2] = useState<number>(2);
    const [consulting3, setConsulting3] = useState<number>(1);
    const [consulting4, setConsulting4] = useState<number>(0);

    const handleQueue1 = () => {
        setConsulting1((prev) => prev - 1);
    };
    const handleQueue2 = () => {
        setConsulting2((prev) => prev - 1);
    };
    const handleQueue3 = () => {
        setConsulting3((prev) => prev - 1);
    };
    const handleQueue4 = () => {
        setConsulting4((prev) => prev - 1);
    };

    const register = () => {};
    return (
        <>
            <MainContainer>
                <BankTellerContainer>
                    <BankTellerWrapper>
                        <BankTellerHeader>1번 창구</BankTellerHeader>
                        <BankDepartment>통장 · 계좌</BankDepartment>
                        <DivisionLine />
                        <BankStatus>창구 상태</BankStatus>
                        {consulting1 === 0 ? (
                            <GreenMark>대기 중</GreenMark>
                        ) : (
                            <OrangeMark>상담 중</OrangeMark>
                        )}
                        <DivisionLine />
                        <BankTellerCustomer>창구 고객</BankTellerCustomer>
                        <BankTellerCustomerName>고건</BankTellerCustomerName>
                        <ButtonContainer>
                            {consulting1 === 0 ? (
                                <TextButton2 width="100%" height="100%" fontSize="20px">
                                    상담 완료
                                </TextButton2>
                            ) : (
                                <TextButton width="100%" text="상담 완료" onClick={handleQueue1} />
                            )}
                        </ButtonContainer>
                    </BankTellerWrapper>
                    <BankQueueWrapper>
                        <BankQueueHeader>
                            <BankList>창구 대기열</BankList>
                            <BankPeopleNumber>{consulting1}명</BankPeopleNumber>
                        </BankQueueHeader>
                    </BankQueueWrapper>
                </BankTellerContainer>
                <BankTellerContainer>
                    <BankTellerWrapper>
                        <BankTellerHeader>2번 창구</BankTellerHeader>
                        <BankDepartment>카드</BankDepartment>
                        <DivisionLine />
                        <BankStatus>창구 상태</BankStatus>
                        {consulting2 === 0 ? (
                            <GreenMark>대기 중</GreenMark>
                        ) : (
                            <OrangeMark>상담 중</OrangeMark>
                        )}
                        <DivisionLine />
                        <BankTellerCustomer>창구 고객</BankTellerCustomer>
                        <BankTellerCustomerName>고건</BankTellerCustomerName>
                        <ButtonContainer>
                            {consulting2 === 0 ? (
                                <TextButton2 width="100%" height="100%" fontSize="20px">
                                    상담 완료
                                </TextButton2>
                            ) : (
                                <TextButton width="100%" text="상담 완료" onClick={handleQueue2} />
                            )}
                        </ButtonContainer>
                    </BankTellerWrapper>
                    <BankQueueWrapper>
                        <BankQueueHeader>
                            <BankList>창구 대기열</BankList>
                            <BankPeopleNumber>{consulting2}명</BankPeopleNumber>
                        </BankQueueHeader>
                    </BankQueueWrapper>
                </BankTellerContainer>
                <BankTellerContainer>
                    <BankTellerWrapper>
                        <BankTellerHeader>3번 창구</BankTellerHeader>
                        <BankDepartment>인터넷뱅킹</BankDepartment>
                        <DivisionLine />
                        <BankStatus>창구 상태</BankStatus>
                        {consulting3 === 0 ? (
                            <GreenMark>대기 중</GreenMark>
                        ) : (
                            <OrangeMark>상담 중</OrangeMark>
                        )}
                        <DivisionLine />
                        <BankTellerCustomer>창구 고객</BankTellerCustomer>
                        <BankTellerCustomerName>고건</BankTellerCustomerName>
                        <ButtonContainer>
                            {consulting3 === 0 ? (
                                <TextButton2 width="100%" height="100%" fontSize="20px">
                                    상담 완료
                                </TextButton2>
                            ) : (
                                <TextButton width="100%" text="상담 완료" onClick={handleQueue3} />
                            )}
                        </ButtonContainer>
                    </BankTellerWrapper>
                    <BankQueueWrapper>
                        <BankQueueHeader>
                            <BankList>창구 대기열</BankList>
                            <BankPeopleNumber>{consulting3}명</BankPeopleNumber>
                        </BankQueueHeader>
                    </BankQueueWrapper>
                </BankTellerContainer>
                <BankTellerContainer>
                    <BankTellerWrapper>
                        <BankTellerHeader>4번 창구</BankTellerHeader>
                        <BankDepartment>대출 · 외환</BankDepartment>
                        <DivisionLine />
                        <BankStatus>창구 상태</BankStatus>
                        {consulting4 === 0 ? (
                            <GreenMark>대기 중</GreenMark>
                        ) : (
                            <OrangeMark>상담 중</OrangeMark>
                        )}
                        <DivisionLine />
                        <BankTellerCustomer>창구 고객</BankTellerCustomer>
                        <BankTellerCustomerName>고건</BankTellerCustomerName>
                        <ButtonContainer>
                            {consulting4 === 0 ? (
                                <TextButton2 width="100%" height="100%" fontSize="20px">
                                    상담 완료
                                </TextButton2>
                            ) : (
                                <TextButton width="100%" text="상담 완료" onClick={handleQueue4} />
                            )}
                        </ButtonContainer>
                    </BankTellerWrapper>
                    <BankQueueWrapper>
                        <BankQueueHeader>
                            <BankList>창구 대기열</BankList>
                            <BankPeopleNumber>{consulting4}명</BankPeopleNumber>
                        </BankQueueHeader>
                    </BankQueueWrapper>
                </BankTellerContainer>
            </MainContainer>
            <ButtonContainer>
                <TextButton width="19%" text="서비스 회원 등록" onClick={register} />
            </ButtonContainer>
        </>
    );
}

export default AdminMain;
