import styled from 'styled-components';

export const StartedEstimatePrice = ({ price }) => {
  const Text = styled.div`
    text-align: right;
    line-height: 1.5;
    font-size: 1em;
    margin-top: 20px;
  `;

  const PriceText = styled.p`
    font-size: 1.6em;
    font-weight: 700;
    font-style: italic;
  `;

  const VatIncludedText = styled.p`
    font-size: 0.8em;
    color: red;
  `;

  return (
    <Text>
      매달 결제하실 금액은
      <PriceText>{price.toLocaleString()}원</PriceText>
      <VatIncludedText>(부가세 포함)</VatIncludedText>
    </Text>
  );
};
