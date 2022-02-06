import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRents } from '../../tools/useRents';

export const RentList = () => {
  const navigate = useNavigate();
  const rents = useRents();

  const redirectToRentDetails = () => {
    if (!rents) return;
    if (rents.length <= 0) return navigate('/started/pricing');
    navigate(`/rents/${rents[0].rentId}`);
  };

  useEffect(redirectToRentDetails, [navigate, rents]);
  return (
    <div>
      <StartedTitle>렌트 목록</StartedTitle>
      <StartedLoading />
    </div>
  );
};
