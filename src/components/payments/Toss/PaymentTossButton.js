import { useEffect, useState } from "react";
import { Client } from "../../../tools/client";
import { PayWithToss } from "../../PayWithToss";
import { StartedBottomPrimary } from "../../started/StartedBottom/StartedBottomPrimary";

export const PaymentTossButton = ({ status, onNext, setReady }) => {
  const [loading, setLoading] = useState(!!status);
  const onCheckoutClick = async () => {
    setLoading(true);
    Client.get("/cards/checkout").then(({ data }) => {
      window.location.href = data.checkoutUri;
      setLoading(false);
    });
  };

  const onCheckActivated = () => {
    if (status !== "ACTIVATED") return;
    Client.get("/cards/sync")
      .then(({ data }) => setReady(!!data.card))
      .then(() => setLoading(false));
  };

  useEffect(onCheckActivated, [setReady, status]);
  if (!status) {
    return (
      <StartedBottomPrimary
        description={
          loading
            ? "토스와 연결하는 중입니다"
            : "원클릭으로 간편하게 결제하세요"
        }
        disabled={loading}
        onClick={onCheckoutClick}
      >
        <PayWithToss>토스로 결제하기</PayWithToss>
      </StartedBottomPrimary>
    );
  }

  if (status === "ACTIVATED") {
    return (
      <StartedBottomPrimary
        description={
          loading
            ? "토스에서 정보를 불러오는 중입니다"
            : "토스와 연결이 완료되었습니다."
        }
        disabled={loading}
        onClick={onNext}
      >
        결제하기
      </StartedBottomPrimary>
    );
  }

  return (
    <StartedBottomPrimary
      onClick={onCheckoutClick}
      description={"죄송합니다. 오류가 발생하였습니다"}
      color="danger"
    >
      재시도하기
    </StartedBottomPrimary>
  );
};
