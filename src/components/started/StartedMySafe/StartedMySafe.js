import { Divider, Grid } from 'antd-mobile';
import styled from 'styled-components';

export const StartedMySafe = ({ children }) => {
  const TitleContainer = styled.p`
    text-align: right;
    margin: 20px 0;
    font-size: 18px;
    font-weight: 800;
  `;

  const WarningContainer = styled.p`
    padding: 15px 15px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 12px;
    background-color: #ffffb8;
    line-height: 1.1;
  `;

  return (
    <div>
      <Divider />
      <Grid columns={2} children={children} />
      <Divider />
      <WarningContainer>
        <p style={{ textAlign: 'center', fontSize: 16, marginBottom: 0 }}>
          💫 운행 중 제3자에 대한 배상책임 💫
        </p>
        <p style={{ margin: '10px 0' }}>
          ⚡️ 이용 중 사고에만 보상이 가능하며, 신청자(1명)에 한해 보험이
          적용됩니다.
        </p>
        <p style={{ margin: '10px 0' }}>
          ⚠️ 단, 화재나 2인 탑승, 부정탑승, 도로교통법에 따른 중과실에 대한
          사고는 보장하지 않습니다.
        </p>
      </WarningContainer>
    </div>
  );
};
