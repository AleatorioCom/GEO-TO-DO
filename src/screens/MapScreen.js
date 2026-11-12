import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';
import useLocation from '../hooks/useLocation';
import MapMarker from '../components/MapMarker';
import RadiusCircle from '../components/RadiusCircle';
import CustomButton from '../components/CustomButton';

export default function MapScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { location } = useLocation();
  const [selected, setSelected] = useState(route.params?.coordinate || null);
  const [radius] = useState(route.params?.radius || 100);

  useEffect(() => {
    if (route.params?.coordinate) setSelected(route.params.coordinate);
  }, [route.params?.coordinate]);

  const initial = selected || location || { latitude: -23.5505, longitude: -46.6333 };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text style={[styles.hint, { color: theme.text }]}>Toque no mapa para escolher o local da tarefa.</Text>
      <MapView
        style={styles.map}
        initialRegion={{ ...initial, latitudeDelta: 0.015, longitudeDelta: 0.015 }}
        showsUserLocation
        onPress={event => setSelected(event.nativeEvent.coordinate)}
      >
        {selected && <MapMarker coordinate={selected} />}
        {selected && <RadiusCircle center={selected} radius={radius} />}
      </MapView>
      <View style={styles.footer}>
        <Text style={{ color: theme.text, marginBottom: 8 }}>
          {selected ? `Local selecionado: ${selected.latitude.toFixed(5)}, ${selected.longitude.toFixed(5)}` : 'Nenhum local selecionado.'}
        </Text>
        <CustomButton title="Usar este local" disabled={!selected} onPress={() => {
          if (route.params?.returnToForm) {
            navigation.navigate('Adicionar tarefa', { coordinate: selected });
          } else {
            Alert.alert('Local selecionado', 'Volte ao cadastro para salvar esta localização.');
          }
        }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  hint: { padding: 12, fontWeight: '600' },
  footer: { padding: 14 }
});
