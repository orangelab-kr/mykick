import { Button, Dialog, Form, Input } from 'antd-mobile';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { NoStyledLink } from '../../components/NoStyledLink';
import { StartedBottom } from '../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedTitle } from '../../components/started/StartedTitle';
import { Client } from '../../tools/client';
import styled from 'styled-components';
import { DepthPage } from '../../components/DepthPage';

const VerifiedText = styled.div`
  color: green;
  margin: 0.6em;
  text-align: right;
`;

export const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [verified, setVerified] = useState(false);
  const [requested, setRequested] = useState(false);
  const [ready, setReady] = useState(false);

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

  const onLogin = async (phoneId) => {
    const form = { phoneId };
    const options = { alert: false };
    const { data } = await Client.post('/auth/signin', form, options);
    return data;
  };

  const requestVerify = async () => {
    setRequested(true);
    setVerified(false);
    const { phoneNo } = form.getFieldsValue();
    await Client.get('/auth/phone', { params: { phoneNo } });
  };

  const onReady = () => {
    setReady(false);
    const { phoneId } = form.getFieldsValue();
    if (!phoneId) return;
    setReady(true);
  };

  const verifyPhone = async () => {
    const body = _.pick(form.getFieldsValue(), 'phoneNo', 'verifyCode');
    if (body.verifyCode.length < 6) return;

    const { data } = await Client.post('/auth/phone', body);
    form.setFieldsValue(_.pick(data, 'phoneId'));
    setVerified(true);
    onReady();
  };

  const onClick = async () => {
    const { phoneId } = form.getFieldsValue();
    const tryLogin = await onLogin(phoneId);
    if (!tryLogin) {
      const confirm = await Dialog.confirm({
        content: `아직 가입을 진행하지 않으셨습니다. 서비스 신청을 위해 이동하시겠습니까?`,
        confirmText: '네, 이동합니다',
        cancelText: '아니요',
      });

      if (confirm) {
        navigate('/started/pricing');
        return;
      }

      setRequested(false);
      setVerified(false);
      setReady(false);

      form.resetFields(['phoneId', 'phoneNo', 'verifyCode']);
      return;
    }

    const { token } = tryLogin;
    const redirect = localStorage.getItem('mykick-redirect');
    localStorage.setItem('mykick-token', token);
    localStorage.removeItem('mykick-redirect');
    navigate(redirect || '/');
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

  return (
    <DepthPage>
      <StartedTitle>로그인</StartedTitle>
      <StartedDescription>전화번호로 간편하게 Ready!</StartedDescription>
      <StartedHashtags>#이어서 #달려봐요 #마이킥</StartedHashtags>
      <Form form={form} style={{ marginTop: '10%' }} onValuesChange={onReady}>
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
        <Form.Item name='phoneId' hidden>
          <Input type='hidden' />
        </Form.Item>
      </Form>
      {verified && <VerifiedText>인증이 완료되었습니다.</VerifiedText>}
      <StartedBottom>
        <StartedBottomPrimary
          description='이어서 달려볼까요?'
          disabled={!ready}
          onClick={onClick}
        >
          로그인
        </StartedBottomPrimary>

        <NoStyledLink to='/'>
          <StartedBottomSecondary>
            아직 <Logo style={{ height: '.8em' }} /> 이 없으신가요?
          </StartedBottomSecondary>
        </NoStyledLink>
      </StartedBottom>
    </DepthPage>
  );
};
