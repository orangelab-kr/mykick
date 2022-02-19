import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StartedLoading } from '../../components/started/StartedLoading';
import { StartedTitle } from '../../components/started/StartedTitle';
import { useRents } from '../../tools/useRents';

export const RentList = () => {
  const navigate = useNavigate();
  const rents = useRents({
    params: {
      status: [
        'Requested',
        'Shipping',
        'Shipped',
        'Activated',
        'Terminated',
        'Suspended',
      ],
    },
  });

  const redirectToRentDetails = () => {
    if (rents === undefined) return;
    if (rents === null) return navigate('/');
    if (rents.length <= 0) return navigate('/started/pricing');
    navigate(`/rents/${rents[0].rentId}`);
  };

  useEffect(redirectToRentDetails, [navigate, rents]);
  if (rents === undefined) return <StartedLoading />;
  return (
    <div>
      <StartedTitle>렌트 목록</StartedTitle>
    </div>
  );
};
