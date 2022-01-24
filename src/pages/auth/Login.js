import { AutoCenter, Button, Dialog, Form, Input } from 'antd-mobile';
import { MessageOutline, RedoOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedHashtags } from '../../components/started/StartedHashtags';
import { StartedTitle } from '../../components/started/StartedTitle';

export const Login = () => {
  const [form] = Form.useForm();
  const [requested, setRequested] = useState(false);

  const SendVerify = (
    <Button size='middle' color='primary' onClick={console.log}>
      {requested ? '재전송' : '문자 발송'}
    </Button>
  );

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

  return (
    <div>
      <StartedTitle>로그인</StartedTitle>
      <StartedDescription>전화번호로 간편하게 Ready!</StartedDescription>
      <StartedHashtags>#이어서 #달려봐요! #마이킥</StartedHashtags>
      <Form form={form} style={{ marginTop: '10%' }}>
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

      <div
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          width: '85%',
          transform: 'translate(-50%, 0)',
        }}
      >
        <NavLink to='/auth/pricing'>
          <Button block color='primary'>
            <p style={{ fontSize: 23 }}>로그인</p>
          </Button>
        </NavLink>

        <NavLink
          to='/auth/pricing'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <AutoCenter style={{ marginTop: 20 }}>
            <div style={{ fontSize: 16, width: '100%' }}>
              아직 마이킥이 없으신가요?
            </div>
          </AutoCenter>
        </NavLink>
      </div>
    </div>
  );
};
