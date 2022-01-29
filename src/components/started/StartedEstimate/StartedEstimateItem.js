import { Grid } from 'antd-mobile';
import styled from 'styled-components';

const EstimateItem = styled(Grid.Item)`
  border-bottom: dashed 1px #eee;
  margin-bottom: -16px;
  padding-bottom: 16px;
`;

const EstimateItemPrice = styled(EstimateItem)`
  font-style: italic;
`;

export const StartedEstimateItem = ({ description, price, optional }) => (
  <>
    <EstimateItem>{description}</EstimateItem>
    <EstimateItemPrice>{price.toLocaleString()}원</EstimateItemPrice>
    <EstimateItem>{optional}</EstimateItem>
  </>
);
