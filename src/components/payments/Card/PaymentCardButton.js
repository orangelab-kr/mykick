import { BankcardOutline } from "antd-mobile-icons";
import { useState } from "react";
import { Client } from "../../../tools/client";
import { StartedBottomPrimary } from "../../started/StartedBottom/StartedBottomPrimary";

export const PaymentCardButton = ({ form, onNext }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const registerCard = () => {
    setError();
    setLoading(true);
    form.submit();
    const body = form.getFieldsValue();
    if (!body.cardNumber || !body.expiry || !body.password || !body.birthday) {
      return;
    }

    Client.post("/cards", body)
      .then(onNext)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (error) {
    return (
      <StartedBottomPrimary
        onClick={registerCard}
        description={error}
        color="danger"
      >
        재시도하기
      </StartedBottomPrimary>
    );
  }

  return (
    <StartedBottomPrimary
      disabled={loading}
      onClick={registerCard}
      description={
        loading
          ? "카드사와 통신하고 있습니다."
          : "카드 정보는 일체 저장되지 않습니다"
      }
    >
      <BankcardOutline /> 신용/체크카드로 결제하기
    </StartedBottomPrimary>
  );
};
