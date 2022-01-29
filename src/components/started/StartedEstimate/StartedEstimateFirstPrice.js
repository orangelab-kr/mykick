import styled from 'styled-components';

export const StartedEstimateFirstPrice = ({ price }) => {
  const Text = styled.div`
    font-size: 0.8em;
    text-align: right;
    margin-top: 2em;
    font-weight: 600;
    word-break: keep-all;
  `;

  return (
    <Text>
      첫 달은 선결제 금액이 포함되어 금액이 {price.toLocaleString()}원 더
      발생합니다.
    </Text>
  );
};
