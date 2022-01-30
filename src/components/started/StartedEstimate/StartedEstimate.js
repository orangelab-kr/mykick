import { Divider, Grid } from 'antd-mobile';
import { FingerdownOutline } from 'antd-mobile-icons';
import { Popover } from 'antd-mobile/es/components/popover/popover';
import styled from 'styled-components';
import { useToggle } from '../../../tools/useToggle';
import { StartedEstimatePrice } from './StartedEstimatePrice';
import { StartedEstimateTitle } from './StartedEstimateTitle';

const EstimateDashedDivider = styled(Divider)`
  border-style: dashed;
`;

const EstimateGrid = styled(Grid)`
  font-size: 0.8em;
`;

const PopoverTip = (
  <p style={{ fontSize: '0.8em' }}>
    <FingerdownOutline /> 아래로 스크롤할 수 있습니다.
  </p>
);

export const StartedEstimate = ({ children, price }) => {
  const [visibleTip, setVisibleTip] = useToggle(true);

  return (
    <div>
      <EstimateDashedDivider />
      <StartedEstimatePrice price={price} />
      <Popover
        destroyOnHide
        placement='top'
        stopPropagation={[]}
        visible={visibleTip}
        content={PopoverTip}
        onClick={setVisibleTip(false)}
        onTouchStart={setVisibleTip(false)}
      >
        <div>
          <StartedEstimateTitle />
          <EstimateDashedDivider />
          <EstimateGrid columns={3} gap={[0, 32]}>
            {children}
          </EstimateGrid>
        </div>
      </Popover>
    </div>
  );
};
