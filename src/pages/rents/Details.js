import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StartedDescription } from '../../components/started/StartedDescription';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRent } from '../../tools/useRents';

export const RentDetails = () => {
  const navigate = useNavigate();
  const { rentId } = useParams();
  const rent = useRent(rentId, { clearCache: true });

  const redirectIfNotActivated = () => {
    if (!rent) return;
    if (!['Requested', 'Shipping', 'Shipped'].includes(rent.status)) return;
    navigate(`/rents/${rentId}/status`);
  };

  useEffect(redirectIfNotActivated, [navigate, rent, rentId]);
  if (!rent) return <StartedLoading>잠시만 기다려주세요.</StartedLoading>;
  return (
    <div>
      <StartedTitle>내 마이킥</StartedTitle>
      <StartedDescription>{rent.name}</StartedDescription>
    </div>
  );
};
