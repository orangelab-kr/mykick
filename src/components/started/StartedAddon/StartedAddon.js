import { Checkbox } from 'antd-mobile';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 15px;
  margin: 0.5em 0;
  padding: 1em 1em 1em 1em;
`;

const InfoCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TitleCard = styled.div`
  display: flex;
  margin-bottom: 0.4em;
`;

const Name = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  margin: 0 0.4em;
`;

const Description = styled.div`
  font-size: 1em;
  word-break: keep-all;
  line-height: 1.2;
`;

const SelectBox = styled(Checkbox)`
  margin-right: 0.5em;
`;

const Image = styled.img`
  height: 9em;
  margin-bottom: 0.8em;
`;

export const StartedAddon = ({ addon, onSelect, selectedAddons }) => (
  <Card onClick={onSelect}>
    {addon.image && <Image src={addon.image} alt='' />}
    <InfoCard>
      <div>
        <TitleCard>
          <Name>{addon.name}</Name>
          <Price>{addon.price.toLocaleString()}원</Price>
        </TitleCard>
        {addon.description && <Description>{addon.description}</Description>}
      </div>
      <SelectBox checked={selectedAddons.includes(addon)} />
    </InfoCard>
  </Card>
);
