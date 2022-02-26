import { Result } from 'antd-mobile';

export const RentSuspended = ({ rent }) => {
  return (
    <Result
      status='warning'
      title={rent.message}
      description={
        rent.status === 'Cancelled'
          ? '마이킥이 취소되었습니다.'
          : '마이킥이 일시정지되었습니다.'
      }
    />
  );
};
