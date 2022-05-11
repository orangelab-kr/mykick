import { Slider } from 'antd-mobile';
import { useState } from 'react';
import { Client } from '../../../tools/client';
import styled from 'styled-components';

export const RentMaxSpeedSlider = ({ rent, setRent }) => {
  const [loading, setLoading] = useState(false);
  const [maxSpeed, setMaxSpeed] = useState(rent.maxSpeed || 25);
  const speedMarks = {
    5: '5KM',
    10: '10KM',
    15: '15KM',
    20: '20KM',
    25: '25KM',
  };

  const onChange = async (maxSpeed) => {
    try {
      if (window.navigator.vibrate) window.navigator.vibrate(100);
      setLoading(true);
      const body = { maxSpeed };
      const path = `/rents/${rent.rentId}`;
      const { data } = await Client.patch(path, body);
      setMaxSpeed(data.rent.maxSpeed || 25);
      setRent(data.rent);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        border: '2px solid #eee',
        borderRadius: '15px',
        padding: '12px',
      }}
    >
      <Text>킥보드 속도</Text>
      <Slider
        ticks
        min={5}
        max={25}
        value={maxSpeed}
        onChange={setMaxSpeed}
        onAfterChange={onChange}
        disabled={loading}
        marks={speedMarks}
      />
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid #eee;
  border-radius: 15px;
  padding: 12px;
`;

const Text = styled.p`
  font-size: 0.8em;
`;
