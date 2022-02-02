import { Dialog, Form, Input } from 'antd-mobile';
import { useEffect, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DepthPage } from '../../../components/DepthPage';
import { GobackLink } from '../../../components/GobackLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';
import { useStorage } from '../../../tools/storage';

const BlankWarningTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const BlankWarningContent = styled.div`
  margin: 0.8em 0;
  font-size: 16px;
`;

const BlankWarningAsk = styled.div`
  color: red;
`;

export const SignupAddress = () => {
  const navigate = useNavigate();
  const detailAddressRef = useRef();
  const [form] = Form.useForm();
  const [visibleSearch, setVisibleSearch] = useState(true);
  const [ready, setReady] = useState(false);
  const storage = useStorage('signup');

  const onComplete = (data) => {
    setVisibleSearch(false);
    const { bname, buildingName, address, addressType } = data;
    const addresses = { address };

    if (addressType === 'R') {
      let extra = '';
      if (bname) extra += bname;
      if (buildingName) extra += extra ? `, ${buildingName}` : buildingName;
      addresses.extraAddress = extra || '';
    }

    form.setFieldsValue(addresses);
    detailAddressRef.current?.focus();
  };

  const onReady = () => {
    setReady(false);
    if (visibleSearch) return;
    const addresses = form.getFieldsValue();
    if (!addresses.address) return;
    setReady(true);
  };

  const onClick = async () => {
    const { address, detailAddress, extraAddress } = form.getFieldsValue();
    if (!detailAddress || !extraAddress) {
      let message =
        !detailAddress && !extraAddress
          ? '상세 주소와 추가 정보를 입력하지 않으셨습니다.'
          : !detailAddress && extraAddress
          ? '상세 주소를 입력하지 않으셨습니다.'
          : '추가 정보를 입력하지 않으셨습니다.';

      const content = (
        <>
          <BlankWarningTitle>{message}</BlankWarningTitle>
          <BlankWarningContent>
            주소가 정확하지 않으실 경우, 배송에 문제가 발생할 수 있습니다.
          </BlankWarningContent>
          <BlankWarningAsk>그래도 진행하시겠습니까?</BlankWarningAsk>
        </>
      );

      const confirm = await Dialog.confirm({
        content,
        confirmText: '네',
        cancelText: '취소',
      });

      if (!confirm) return;
    }

    let finallyAddress = `${address}`;
    if (detailAddress) finallyAddress += `, ${detailAddress}`;
    if (extraAddress) finallyAddress += ` (${extraAddress})`;
    storage.set('address', finallyAddress);
    window.scrollTo(0, 0);
    navigate('/auth/signup/idcard');
  };

  useEffect(onReady, [form, visibleSearch]);
  return (
    <DepthPage>
      <StartedTitle subtitle='배송지'>가입하기</StartedTitle>
      <StartedDescription>
        진행을 위해 아래 정보가 필요합니다.
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>
      {visibleSearch ? (
        <DaumPostcode
          style={{ height: '35em' }}
          onComplete={onComplete}
          autoClose={false}
        />
      ) : (
        <Form form={form} style={{ marginTop: '10%' }} onValuesChange={onReady}>
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
        <StartedIndicator current={1} />
        <StartedBottomPrimary
          description={ready ? '신분증 인증하기' : '모든 정보를 입력해주세요'}
          disabled={!ready}
          onClick={onClick}
        >
          다음으로
        </StartedBottomPrimary>

        <GobackLink to={-1}>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
