import BoxButton from "@components/common/button/BoxButton";
import Bankbook from "@assets/icons/bankbook-icon.svg";

function App() {
    return (
        <div>
            <BoxButton
                type="button"
                width="45%"
                height="100%"
                text="통장 · 계좌"
                subText="통장 및 적금, 청약 신규, 자동이체, \n각종 변경, 분실 신고 등"
                iconSrc={Bankbook}
            />
        </div>
    );
}

export default App;
