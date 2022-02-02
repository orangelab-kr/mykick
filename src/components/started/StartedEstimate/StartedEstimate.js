import { Divider, Grid } from 'antd-mobile';
import styled from 'styled-components';
import { StartedEstimatePrice } from './StartedEstimatePrice';
import { StartedEstimateTitle } from './StartedEstimateTitle';

const EstimateDashedDivider = styled(Divider)`
  border-style: dashed;
`;

const EstimateGrid = styled(Grid)`
  font-size: 0.8em;
`;

export const StartedEstimate = ({ children, price }) => (
  <div>
    <EstimateDashedDivider />
    <StartedEstimatePrice price={price} />
    <StartedEstimateTitle />
    <EstimateDashedDivider />
    <EstimateGrid columns={3} gap={[0, 32]}>
      {children}
    </EstimateGrid>
  </div>
);
