import Lottie from "react-lottie";
import * as CheckingIcon from "../../../assets/lotties/10075-credit-card-success.json";
import * as ErrorIcon from "../../../assets/lotties/6873-under-maintenance.json";
import * as ReadyIcon from "../../../assets/lotties/68994-success.json";
import * as RegisterIcon from "../../../assets/lotties/86864-card-ubank.json";

export const PaymentToss = ({ ready, status }) => (
  <Lottie
    options={{
      loop: !ready,
      animationData: !status
        ? RegisterIcon
        : ready
        ? ReadyIcon
        : status === "ACTIVATED"
        ? CheckingIcon
        : ErrorIcon,
    }}
    style={{
      margin: "5em 0 0 0",
      height: "60vh",
      pointerEvents: "none",
    }}
  />
);
