import { Button, Dialog, Form, Input } from 'antd-mobile';
import { useState } from 'react';
import { GobackLink } from '../../../components/GobackLink';
import { NoStyledLink } from '../../../components/NoStyledLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';

export const SignupInfo = () => {
  const [form] = Form.useForm();
  const [requested, setRequested] = useState(false);
  const onPhoneNoChange = (phoneNo) => {
    phoneNo = phoneNo
      .replace(/[^0-9]/, '')
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    form.setFieldsValue({ phoneNo });
    if (phoneNo.length >= 13) {
      Dialog.confirm({
        content: `인증번호를 발송할까요?`,
        confirmText: '발송',
        cancelText: '취소',
      });
    }
  };

  const SendVerify = (
    <Button size='middle' color='primary' onClick={console.log}>
      {requested ? '재전송' : '문자 발송'}
    </Button>
  );

  return (
    <div>
      <StartedTitle subtitle='기본정보'>가입하기</StartedTitle>
      <StartedDescription>
        진행을 위해 아래 정보가 필요합니다.
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>
      <Form form={form} style={{ marginTop: '10%' }}>
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
        <Form.Item name='code' label='인증번호' extra={SendVerify}>
          <Input
            type='text'
            pattern='[0-9]*'
            placeholder='000000'
            // onChange={onVerifyPhone}
          />
        </Form.Item>
      </Form>
      <StartedBottom>
        <StartedIndicator current={2} />
        <NoStyledLink to='/auth/signup/address'>
          <StartedBottomPrimary description='배송지 입력하기'>
            모두 다 입력했습니다.
          </StartedBottomPrimary>
        </NoStyledLink>

        <GobackLink to={-2}>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </div>
  );
};
