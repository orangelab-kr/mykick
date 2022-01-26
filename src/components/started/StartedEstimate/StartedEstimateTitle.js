import { Grid } from 'antd-mobile';
import styled from 'styled-components';

export const StartedEstimateTitle = () => {
  const TitleGrid = styled(Grid)`
    margin-top: 15px;
    font-weight: 600;
    font-size: 0.9em;
  `;

  const VatIncludedText = styled.p`
    display: inline;
    word-break: keep-all;
    font-weight: 400;
    font-size: 10px;
    color: red;
  `;

  return (
    <TitleGrid columns={3}>
      <Grid.Item>항목</Grid.Item>
      <Grid.Item>
        금액 <VatIncludedText>(부가세포함)</VatIncludedText>
      </Grid.Item>
      <Grid.Item>비고</Grid.Item>
    </TitleGrid>
  );
};
