import { Button, Dialog, Form, Input } from 'antd-mobile';
import { useState } from 'react';
import { DepthPage } from '../../../components/DepthPage';
import { GobackLink } from '../../../components/GobackLink';
import { NoStyledLink } from '../../../components/NoStyledLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';
import { Client } from '../../../tools/client';
import _ from 'lodash';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../../../tools/storage';

const VerifiedText = styled.div`
  color: green;
  margin: 0.6em;
  text-align: right;
`;

export const SignupInfo = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [requested, setRequested] = useState(false);
  const [verified, setVerified] = useState(false);
  const [ready, setReady] = useState(false);
  const storage = getStorage('signup');

  const onPhoneNoChange = async (phoneNo) => {
    phoneNo = phoneNo
      .replace(/[^0-9]/, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    setVerified(false);
    form.setFieldsValue({ phoneNo });
    if (phoneNo.length >= 13) {
      const request = await Dialog.confirm({
        content: `인증번호를 발송할까요?`,
        confirmText: '발송',
        cancelText: '취소',
      });

      if (request) await requestVerify();
    }
  };

  const requestVerify = async () => {
    setRequested(true);
    setVerified(false);
    const { phoneNo } = form.getFieldsValue();
    await Client.get('/auth/phone', { params: { phoneNo } });
  };

  const verifyPhone = async () => {
    const body = _.pick(form.getFieldsValue(), 'phoneNo', 'verifyCode');
    if (body.verifyCode.length < 6) return;

    const { data } = await Client.post('/auth/phone', body);
    form.setFieldsValue(_.pick(data, 'phoneId'));
    setVerified(true);
    onReady();
  };

  const onReady = () => {
    setReady(false);
    const { name, phoneId } = form.getFieldsValue();
    if (name.length <= 2) return;
    if (!phoneId) return;
    setReady(true);
  };

  const SendVerify = (
    <Button
      size='middle'
      color='primary'
      onClick={requestVerify}
      disabled={verified}
    >
      {requested ? '재전송' : '문자 발송'}
    </Button>
  );

  const onClick = () => {
    const value = form.getFieldsValue();
    storage.setAll(_.pick(value, 'name', 'phoneId'));
    navigate('/auth/signup/address');
  };

  return (
    <DepthPage>
      <StartedTitle subtitle='기본정보'>가입하기</StartedTitle>
      <StartedDescription>
        진행을 위해 아래 정보가 필요합니다.
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>
      <Form form={form} style={{ marginTop: '10%' }} onValuesChange={onReady}>
        <Form.Item name='name' label='성함'>
          <Input type='name' placeholder='홍길동' />
        </Form.Item>
        <Form.Item name='phoneNo' label='전화번호'>
          <Input
            type='tel'
            placeholder='010-0000-0000'
            onChange={onPhoneNoChange}
          />
        </Form.Item>
        <Form.Item name='verifyCode' label='인증번호' extra={SendVerify}>
          <Input
            type='text'
            pattern='[0-9]*'
            placeholder='000000'
            onChange={verifyPhone}
            disabled={!requested || verified}
          />
        </Form.Item>
        <Form.Item name='phoneId' hidden />
      </Form>
      {verified && <VerifiedText>인증이 완료되었습니다.</VerifiedText>}
      <StartedBottom>
        <StartedIndicator current={2} />
        <StartedBottomPrimary
          description={ready ? '배송지 입력하기' : '모든 정보를 입력해주세요'}
          disabled={!ready}
          onClick={onClick}
        >
          다음으로
        </StartedBottomPrimary>

        <GobackLink>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
