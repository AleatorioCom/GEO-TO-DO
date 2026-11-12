import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import useLocation from '../hooks/useLocation';
import CustomButton from '../components/CustomButton';

export default function AddTaskScreen({ navigation, route }) {
  const { addTask } = useTasks();
  const { theme } = useTheme();
  const { location } = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [radius, setRadius] = useState(100);
  const [coordinate, setCoordinate] = useState(route.params?.coordinate || null);

  useEffect(() => {
    if (route.params?.coordinate) setCoordinate(route.params.coordinate);
  }, [route.params?.coordinate]);

  const inputStyle = [styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }];

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Campo obrigatório', 'Informe o nome da tarefa.');
      return;
    }
    if (!coordinate && !location) {
      Alert.alert('Local necessário', 'Selecione um local no mapa ou permita o acesso à localização.');
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      radius,
      latitude: (coordinate || location).latitude,
      longitude: (coordinate || location).longitude
    });
    setTitle('');
    setDescription('');
    setCoordinate(null);
    setRadius(100);
    navigation.goBack();
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>Nome da tarefa *</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Ex.: Comprar pão" placeholderTextColor={theme.muted} style={inputStyle} />

      <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
      <TextInput value={description} onChangeText={setDescription} placeholder="Detalhes (opcional)" placeholderTextColor={theme.muted} multiline style={[inputStyle, { minHeight: 85, textAlignVertical: 'top' }]} />

      <Text style={[styles.label, { color: theme.text }]}>Localização</Text>
      <Text style={{ color: theme.muted, marginBottom: 8 }}>
        {coordinate ? 'Local escolhido no mapa.' : location ? 'Usando sua localização atual como ponto inicial.' : 'Nenhuma localização disponível.'}
      </Text>
      <CustomButton title="Escolher no mapa" variant="secondary" onPress={() => navigation.navigate('MapScreen', { returnToForm: true })} />

      <Text style={[styles.label, { color: theme.text }]}>Raio do lembrete: {radius} metros</Text>
      <Slider minimumValue={50} maximumValue={1000} step={50} value={radius} onValueChange={setRadius} minimumTrackTintColor={theme.primary} />

      <CustomButton title="Salvar tarefa" onPress={handleSave} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: '700', marginTop: 14, marginBottom: 8 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 16 }
});
