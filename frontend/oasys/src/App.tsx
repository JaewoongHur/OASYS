import BoxButton from "@components/common/button/BoxButton";
import TextButton from "@components/common/button/TextButton";
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
            <TextButton width="100px" text="확인" onClick={() => {}} />
        </div>
    );
}

export default App;
