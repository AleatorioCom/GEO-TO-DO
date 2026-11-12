import React from 'react';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import MapView from 'react-native-maps';
import MapMarker from '../components/MapMarker';
import RadiusCircle from '../components/RadiusCircle';

export default function TaskDetailsScreen({ route, navigation }) {
  const { tasks, completeTask, deleteTask } = useTasks();
  const { theme } = useTheme();
  const task = tasks.find(item => item.id === route.params?.taskId);

  if (!task) return <Text style={{ color: theme.text, padding: 20 }}>Tarefa não encontrada.</Text>;

  const coordinate = { latitude: task.latitude, longitude: task.longitude };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>
      <Text style={{ color: theme.muted, marginBottom: 12 }}>{task.description || 'Sem descrição.'}</Text>
      <Text style={{ color: theme.text, marginBottom: 6 }}>Raio do lembrete: {task.radius} m</Text>
      <Text style={{ color: theme.text, marginBottom: 12 }}>Status: {task.completed ? 'Concluída' : 'Pendente'}</Text>
      <MapView
        style={styles.map}
        scrollEnabled={false}
        initialRegion={{ ...coordinate, latitudeDelta: 0.01, longitudeDelta: 0.01 }}
      >
        <MapMarker coordinate={coordinate} title={task.title} />
        <RadiusCircle center={coordinate} radius={task.radius} />
      </MapView>
      {!task.completed && <CustomButton title="Concluir tarefa" onPress={() => {
        completeTask(task.id);
        navigation.goBack();
      }} />}
      <CustomButton title="Excluir tarefa" variant="secondary" onPress={() => {
        Alert.alert('Excluir tarefa', 'Deseja realmente excluir esta tarefa?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', style: 'destructive', onPress: () => {
            deleteTask(task.id);
            navigation.goBack();
          }}
        ]);
      }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 25, fontWeight: '800', marginBottom: 8 },
  map: { height: 240, borderRadius: 14, marginVertical: 16 }
});
