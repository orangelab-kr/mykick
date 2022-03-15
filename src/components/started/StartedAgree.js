import styled from 'styled-components';

const AgreeText = styled.div`
  margin: .5em 0;
  padding: 1em 1em 1em 2.5em;
  border-radius: 8px;
  background-color #eee;
  line-height: 1.5;
  word-break: keep-all;
`;

const AgreeDescription = styled.div`
  margin-top: 1em;
`;

const AgreeTitle = styled.div`
  font-size: 1.2em;
  margin-left: -1.3em;
  margin-bottom: 0.5em;
  font-weight: 600;
`;

export const StartedAgree = () => (
  <AgreeText>
    <AgreeTitle>✋ 약관에 동의합니다.</AgreeTitle>
    <AgreeDescription>
      결제시{' '}
      <a a href='https://i.hikick.kr/mykick' target='_blank' rel='noreferrer'>
        마이킥 유의사항
      </a>{' '}
      및 하이킥{' '}
      <a href='https://i.hikick.kr/terms' target='_blank' rel='noreferrer'>
        개인정보취급방침
      </a>
      {', '}
      <a href='https://i.hikick.kr/policy' target='_blank' rel='noreferrer'>
        개인정보취급방침
      </a>
      에 동의하게 됩니다.
    </AgreeDescription>
  </AgreeText>
);
