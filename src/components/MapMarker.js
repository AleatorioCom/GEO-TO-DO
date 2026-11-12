import React from 'react';
import { Marker } from 'react-native-maps';

export default function MapMarker({ coordinate, title = 'Local da tarefa' }) {
  return <Marker coordinate={coordinate} title={title} />;
}
