import { Form, Input } from 'antd-mobile';
import { useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { GobackLink } from '../../../components/GobackLink';
import { NoStyledLink } from '../../../components/NoStyledLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';

export const SignupAddress = () => {
  const detailAddressRef = useRef();
  const [form] = Form.useForm();
  const [visibleSearch, setVisibleSearch] = useState(true);

  const onComplete = (data) => {
    setVisibleSearch(false);
    const { bname, buildingName, address, addressType } = data;
    const addresses = { address };
    console.log(data);

    if (addressType === 'R') {
      let extra = '';
      if (bname) extra += bname;
      if (buildingName) extra += extra ? `, ${buildingName}` : buildingName;
      addresses.extraAddress = extra || '';
    }

    form.setFieldsValue(addresses);
    detailAddressRef.current?.focus();
  };

  return (
    <div>
      <StartedTitle subtitle='배송지'>가입하기</StartedTitle>
      <StartedDescription>
        진행을 위해 아래 정보가 필요합니다.
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>
      {visibleSearch ? (
        <DaumPostcode
          style={{ height: '55vh' }}
          onComplete={onComplete}
          autoClose={false}
        />
      ) : (
        <Form form={form} style={{ marginTop: '10%' }}>
          <Form.Item name='address' label='주소'>
            <Input type='address' placeholder='서울 강남구 테헤란로78길 14-8' />
          </Form.Item>
          <Form.Item name='detailAddress' label='상세 주소'>
            <Input type='address' placeholder='10층' ref={detailAddressRef} />
          </Form.Item>
          <Form.Item name='extraAddress' label='추가 정보'>
            <Input type='address' placeholder='대치동' />
          </Form.Item>
        </Form>
      )}

      <StartedBottom>
        <StartedIndicator current={2} />
        <NoStyledLink to='/auth/signup/idcard'>
          <StartedBottomPrimary description='신분증 인증하기'>
            배송지를 입력했습니다.
          </StartedBottomPrimary>
        </NoStyledLink>

        <GobackLink to={-1}>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </div>
  );
};
