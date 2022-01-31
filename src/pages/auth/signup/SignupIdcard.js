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

const CardImage = styled(Image)`
  display: ${({ $hidden }) => ($hidden ? 'none' : 'block')};
  position: absolute;
  height: 90%;
  width: 94%;
  border-radius: 10px;
`;

const PreviewImage = styled(CardImage)`
  filter: blur(4px);
`;

const SafetyText = styled.div`
  margin: .5em 0;
  padding: 1em 1em 1em 2.5em;
  border-radius: 8px;
  background-color #eee;
  line-height: 1.2;
`;

const SafetyTitle = styled.div`
  font-size: 1.2em;
  margin-left: -1.3em;
  margin-bottom: 0.5em;
  font-weight: 600;
`;

const SafetyBold = styled.p`
  display: inline;
  font-weight: 800;
`;

const SafetyDescription = styled.div`
  margin-top: 1em;
`;

export const SignupIdcard = () => {
  const inputRef = useRef();
  const [ready, setReady] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [image, setImage] = useState();

  const onChangeImage = async (event) => {
    if (event.target.files.length <= 0) return;
    setReady(false);
    setImage();

    const [image] = event.target.files;
    setPreviewImage(URL.createObjectURL(image));

    const headers = {
      Authorization: 'Bearer mykick',
      'Content-Type': image.type,
    };

    const { data } = await axios.post(imageURL, image, { headers });
    setImage(data.url);
  };

  const onImageLoad = async (event) => {
    URL.revokeObjectURL(previewImage);
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
        {!ready && <PreviewImage src={previewImage} fit='cover' />}
        <CardImage
          src={image}
          $hidden={!ready}
          onLoad={onImageLoad}
          fit='cover'
        />
        {!ready && previewImage && <SpinLoading />}
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
      <SafetyText>
        <SafetyTitle>✅ 마이킥이니까, 안심하세요.</SafetyTitle>
        <SafetyDescription>
          <SafetyBold>마이킥</SafetyBold>은 고객님의 개인정보를 최우선으로
          관리하고자 노력하고 있습니다.
        </SafetyDescription>
        <SafetyDescription>
          <SafetyBold>신분증 사진</SafetyBold>은 HTTPS를 통해 안전하게 처리되며,
          <SafetyBold>암호화</SafetyBold>되어 저장됩니다.
        </SafetyDescription>
        <SafetyDescription>
          고객님의 개인정보는 <SafetyBold>개인정보취급방침</SafetyBold>을 통해
          자세한 처리방침을 확인하실 수 있습니다.
        </SafetyDescription>
      </SafetyText>

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
