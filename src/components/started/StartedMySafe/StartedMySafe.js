import { Divider, Grid } from 'antd-mobile';
import styled from 'styled-components';

const WarningContainer = styled.div`
  padding: 1em 1em;
  font-size: 0.8em;
  word-break: keep-all;
  font-weight: 600;
  border-radius: 12px;
  background-color: #ffffb8;
  line-height: 1.1;
`;

export const StartedMySafe = ({ children }) => {
  return (
    <div>
      <Divider style={{ margin: '.5em 0' }} />
      <Grid columns={2} children={children} />
      <Divider style={{ margin: '.5em 0' }} />
      <WarningContainer>
        <p style={{ textAlign: 'center', fontSize: '1.1em', marginBottom: 0 }}>
          운행 중 제3자에 대한 배상책임
        </p>
        <p style={{ margin: '1em 0' }}>
          ⚡️ 이용 중 사고에만 보상이 가능하며, 신청자(1명)에 한해 보험이
          적용됩니다.
        </p>
        <p style={{ margin: '1em 0' }}>
          ⚠️ 단, 화재나 2인 탑승, 부정탑승, 도로교통법에 따른 중과실에 대한
          사고는 보장하지 않습니다.
        </p>
      </WarningContainer>
    </div>
  );
};
