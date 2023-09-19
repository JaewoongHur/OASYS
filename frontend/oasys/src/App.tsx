import BoxButton from "@components/common/button/BoxButton";
import TextButton from "@components/common/button/TextButton";
import FloatingActionButton from "@components/common/button/FloatingActionButton";
import Bankbook from "@assets/icons/bankbook-icon.svg";

function App() {
    return (
        <div>
            <BoxButton
                width="30%"
                height="100%"
                text="통장 · 계좌"
                subText="통장 및 적금, 청약 신규, 자동이체, \n각종 변경, 분실 신고 등"
                iconSrc={Bankbook}
            />
            <TextButton
                width="150px"
                height="150px"
                text="확인"
                fontSize="50px"
                onClick={() => {}}
            />
            <TextButton width="100px" text="확인" onClick={() => {}} />
            <TextButton width="100px" text="확인" disabled onClick={() => {}} />
            <TextButton width="100px" text="확인" category="negative" onClick={() => {}} />
            <TextButton width="100px" text="확인" category="negative" disabled onClick={() => {}} />
            <FloatingActionButton width="150px" text="계좌/n이체" />
        </div>
    );
}

export default App;
