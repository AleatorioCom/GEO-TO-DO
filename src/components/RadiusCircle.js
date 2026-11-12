import React from 'react';
import { Circle } from 'react-native-maps';

export default function RadiusCircle({ center, radius }) {
  return (
    <Circle
      center={center}
      radius={radius}
      strokeColor="rgba(123, 38, 58, 0.9)"
      fillColor="rgba(123, 38, 58, 0.18)"
      strokeWidth={2}
    />
  );
}
