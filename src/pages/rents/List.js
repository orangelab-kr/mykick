import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRents } from '../../tools/useRents';

export const RentList = () => {
  const navigate = useNavigate();
  const [rents] = useRents();

  const redirectToRentDetails = () => {
    if (rents === undefined) return;
    if (rents === null) return navigate('/');
    const filteredRents = rents.filter((r) => r.status !== 'Cancelled');
    if (filteredRents.length <= 0) return navigate('/started/pricing');
    navigate(`/rents/${filteredRents[0].rentId}`);
  };

  useEffect(redirectToRentDetails, [navigate, rents]);
  if (rents === undefined) return <StartedLoading />;
  return (
    <div>
      <StartedTitle>렌트 목록</StartedTitle>
    </div>
  );
};
