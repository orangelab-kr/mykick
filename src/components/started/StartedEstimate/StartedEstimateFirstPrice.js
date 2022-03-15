import styled from 'styled-components';

const Text = styled.div`
  font-size: 0.9em;
  text-align: right;
  margin-top: 2em;
  font-weight: 600;
  word-break: keep-all;
`;

export const StartedEstimateFirstPrice = ({ price }) => {
  if (!price) return <></>;
  return (
    <Text>
      첫 달은 부가 상품 {price.toLocaleString()}원과 함께 결제될 예정입니다.
    </Text>
  );
};
