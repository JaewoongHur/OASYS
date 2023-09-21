/* Import */
import { Bankbook, Card, Internet, Money } from "@assets/icons";

// ----------------------------------------------------------------------------------------------------

/* Type */
interface MenuItem {
    id: number;
    text: string;
    subText: string;
    iconSrc: string;
}

interface ServiceItem {
    id: number;
    text: string;
}

// ----------------------------------------------------------------------------------------------------

/* Menu Data */
const menuData: MenuItem[] = [
    {
        id: 0,
        text: "통장 · 계좌",
        subText: "통장 및 적금, 청약 신규, 자동이체,\n각종 변경, 분실 신고 등",
        iconSrc: Bankbook,
    },
    {
        id: 1,
        text: "카드",
        subText: "발급 및 재발급, 한도 · 비밀번호 변경,\n사고 신고, 현금서비스, 교통카드 등",
        iconSrc: Card,
    },
    {
        id: 2,
        text: "인터넷뱅킹",
        subText: "가입, OTP 및 보안카드, 텔레뱅킹,\n이체한도 · 비밀번호 변경 등",
        iconSrc: Internet,
    },
    {
        id: 3,
        text: "대출 · 외환",
        subText: "예 · 적금 담보 대출, 원금 및 이자 상환,\n공과금 납부, 증명서 발급, 환전 등",
        iconSrc: Money,
    },
];

/* Service Data */
const serviceData: ServiceItem[] = [
    {
        id: 0,
        text: "입금",
    },
    {
        id: 1,
        text: "계좌\n이체",
    },
    {
        id: 2,
        text: "송금",
    },
    {
        id: 3,
        text: "출금",
    },
    {
        id: 4,
        text: "통장\n정리",
    },
    {
        id: 5,
        text: "현금\n서비스",
    },
    {
        id: 6,
        text: "공과금\n납부",
    },
];

// ----------------------------------------------------------------------------------------------------

/* Export */
export { menuData, serviceData };
