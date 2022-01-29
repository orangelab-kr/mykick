import { Radio } from 'antd-mobile';
import styled from 'styled-components';

const Card = styled.div`
  border: solid 1px #eee;
  border-radius: 12px;
  margin: 0.6em 0;
  padding: 1.5em 1em;
  line-height: 1.3;
  display: flex;
  overflow-wrap: break-word;
  align-items: center;
  cursor: pointer;
`;

const Item = styled.div`
  margin: 0 0.5em;
  width: ${({ percent }) => `${percent - 5}%`};
`;

const Name = styled.div`
  font-size: 1.2em;
  font-weight: 800;
`;

const Price = styled.div`
  margin-top: 0.3em;
  font-size: 0.9em;
  font-weight: 400;
  font-style: italic;
`;

const Description = styled.div`
  border-top: solid 1px #eee;
  margin-top: 0.3em;
  padding-top: 0.3em;
  font-size: 1em;
  font-weight: 500;
`;

export const StartedPricing = ({ pricing, onSelect, selectedPricing }) => (
  <Card onClick={onSelect}>
    <Item percent={10}>
      <Radio checked={pricing === selectedPricing} />
    </Item>
    <Item percent={90}>
      <Name>{pricing.name}</Name>
      <Price>월 {pricing.monthlyPrice.toLocaleString()}원</Price>
      {pricing.description && <Description>{pricing.description}</Description>}
    </Item>
  </Card>
);
