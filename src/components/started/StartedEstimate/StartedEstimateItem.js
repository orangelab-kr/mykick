import { Grid } from 'antd-mobile';
import styled from 'styled-components';

const EstimateItem = styled(Grid.Item)`
  border-bottom: dashed 1px #eee;
  margin-bottom: -16px;
  padding-bottom: 16px;
`;

const EstimateItemPrice = styled.div`
  disply: inline;
  font-style: italic;
  line-height: 1.4;
  font-weight: ${({ $emphasis }) => ($emphasis ? '600' : '400')};
  font-size: ${({ $emphasis }) => ($emphasis ? '15.8' : '12.8')}px;
  text-decoration: ${({ $discount }) =>
    isNaN($discount) ? 'none' : 'line-through'};
`;

export const StartedEstimateItem = ({
  description,
  price,
  discountPrice,
  optional,
}) => (
  <>
    <EstimateItem>{description}</EstimateItem>
    <EstimateItem>
      <EstimateItemPrice $discount={discountPrice}>
        {price.toLocaleString()}원
      </EstimateItemPrice>
      {!isNaN(discountPrice) && (
        <EstimateItemPrice $emphasis>
          {discountPrice.toLocaleString()}원
        </EstimateItemPrice>
      )}
    </EstimateItem>
    <EstimateItem>{optional}</EstimateItem>
  </>
);
