import { ProgressCircle } from 'antd-mobile';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: baseline;
  font-size: 0.9em;
  margin: 3em 0;
`;

const PrimaryProgressCircle = styled(ProgressCircle)`
  --size: 8em;
  --fill-color: var(${({ color }) => `--adm-color-${color || 'success'}`});
`;

const SubProgressCircle = styled(PrimaryProgressCircle)`
  --size: 5.3em;
`;

const PrimaryTitle = styled.div`
  font-size: 2em;
  font-weight: 600;
`;

const SecondaryTitle = styled(PrimaryTitle)`
  font-size: 1.5em;
`;

const GrayText = styled.div`
  color: #999;
  font-size: 0.85em;
`;

export const RentProgress = ({ expiredAt, scooterBattery, iotBattery }) => {
  const daysLeft = dayjs(expiredAt).diff(dayjs(), 'days');
  const daysPercent = Math.round(Math.min(100, (100 / 30) * daysLeft));
  const isLowDaysLeft = daysLeft < 7;
  const isLowScooterBattery = scooterBattery < 20;
  const isLowIotBattery = iotBattery < 50;

  return (
    <Container>
      <SubProgressCircle
        percent={daysPercent}
        color={isLowDaysLeft ? 'danger' : 'success'}
      >
        <SecondaryTitle>{daysLeft.toLocaleString()}일</SecondaryTitle>
        <GrayText>남은 일자</GrayText>
      </SubProgressCircle>
      <PrimaryProgressCircle
        percent={scooterBattery}
        color={isLowScooterBattery ? 'danger' : 'success'}
      >
        <PrimaryTitle>{scooterBattery}%</PrimaryTitle>
        <GrayText>{isLowScooterBattery ? '충전 필요' : '사용 가능'}</GrayText>
      </PrimaryProgressCircle>
      <SubProgressCircle
        percent={iotBattery}
        color={isLowIotBattery ? 'danger' : 'success'}
      >
        <SecondaryTitle>{iotBattery}%</SecondaryTitle>
        <GrayText>보조 전원</GrayText>
      </SubProgressCircle>
    </Container>
  );
};
