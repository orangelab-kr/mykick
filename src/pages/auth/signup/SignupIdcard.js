import { Button, Image, SpinLoading } from 'antd-mobile';
import axios from 'axios';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { imageURL } from '../../..';
import { DepthPage } from '../../../components/DepthPage';
import { GobackLink } from '../../../components/GobackLink';
import { StartedBottom } from '../../../components/started/StartedBottom/StartedBottom';
import { StartedBottomPrimary } from '../../../components/started/StartedBottom/StartedBottomPrimary';
import { StartedBottomSecondary } from '../../../components/started/StartedBottom/StartedBottomSecondary';
import { StartedDescription } from '../../../components/started/StartedDescription';
import { StartedHashtags } from '../../../components/started/StartedHashtags';
import { StartedIndicator } from '../../../components/started/StartedIndicator';
import { StartedTitle } from '../../../components/started/StartedTitle';

const Preview = styled.div`
  width: 94%;
  height: 200px;
  padding: 3%;
  position: relative;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled(Image)`
  position: absolute;
  height: 90%;
  width: 94%;
  border-radius: 10px;
  filter: blur(${({ loading }) => (loading ? 4 : 0)}px);
`;

export const SignupIdcard = () => {
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [image, setImage] = useState();

  const onChangeImage = async (event) => {
    if (event.target.files.length <= 0) return;
    setLoading(true);
    const [image] = event.target.files;
    const headers = {
      Authorization: 'Bearer mykick',
      'Content-Type': image.type,
    };

    setImage(URL.createObjectURL(image));
    const { data } = await axios
      .post(imageURL, image, { headers })
      .finally(() => setLoading(false));
    setImage(data.url);
    setLoading(false);
    setReady(true);
  };

  return (
    <DepthPage>
      <StartedTitle subtitle='신분증'>가입하기</StartedTitle>
      <StartedDescription>
        여권 또는 주민등록증을 업로드해주세요.
      </StartedDescription>
      <StartedHashtags>#개인정보도 #안전하게 #마이킥</StartedHashtags>

      <Preview>
        <PreviewImage src={image} loading={loading} fit='cover' />
        {loading && <SpinLoading />}
      </Preview>

      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        onChange={onChangeImage}
        ref={inputRef}
      />

      <Button block color='success' onClick={() => inputRef.current.click()}>
        ⚡️ {ready ? '다시 업로드' : '업로드하기'}
      </Button>

      <StartedBottom>
        <StartedIndicator current={2} />
        <StartedBottomPrimary
          description={
            ready
              ? '마이킥을 본격적으로 이용해볼까요?'
              : '신분증을 업로드해주세요'
          }
          disabled={!ready}
        >
          가입 완료하기
        </StartedBottomPrimary>

        <GobackLink to={-1}>
          <StartedBottomSecondary>뒤로 가기</StartedBottomSecondary>
        </GobackLink>
      </StartedBottom>
    </DepthPage>
  );
};
