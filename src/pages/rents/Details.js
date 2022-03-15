import { Divider } from 'antd-mobile';
import { SetOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { NoStyledLink } from '../../components/NoStyledLink';
import { RentControl } from '../../components/rent/RentControl';
import { RentProgress } from '../../components/rent/RentDetails/RentProgress';
import { RentSuspended } from '../../components/rent/RentSuspended';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRent, useRentStatus } from '../../tools/useRents';

const RentName = styled(StartedTitle)`
  font-size: 1.3em;
`;

export const RentDetails = () => {
  const navigate = useNavigate();
  const { rentId } = useParams();
  const [rent, setRent] = useRent(rentId, { realtime: true, clearCache: true });
  const [status] = useRentStatus(rentId, { realtime: true });

  const redirectStatusOrMain = () => {
    if (rent === undefined) return;
    if (rent === null) return navigate('/rents');
    if (!['Requested', 'Shipping', 'Shipped'].includes(rent.status)) return;
    navigate(`/rents/${rentId}/status`);
  };

  useEffect(redirectStatusOrMain, [navigate, rent, rentId]);
  if (!rent) return <StartedLoading />;
  return (
    <div>
      <div style={{ height: '1.6em' }}>
        <Logo style={{ height: '100%' }} />
        <NoStyledLink
          to={`/rents/${rent.rentId}/settings`}
          style={{ float: 'right', display: 'flex', alignItems: 'center' }}
        >
          <SetOutline width='1.5em' height='100%' />
          <p style={{ paddingLeft: '.3em' }}>설정</p>
        </NoStyledLink>
      </div>
      <RentName>{rent.name}</RentName>
      <RentProgress
        expiredAt={rent.expiredAt}
        scooterBattery={10}
        iotBattery={100}
      />
      <Divider />
      {rent.status === 'Activated' ? (
        <RentControl rent={rent} setRent={setRent} status={status} />
      ) : (
        <RentSuspended rent={rent} />
      )}
    </div>
  );
};
