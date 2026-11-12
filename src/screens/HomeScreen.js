import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTasks } from '../context/TaskContext';
import { useTheme } from '../context/ThemeContext';
import useLocation from '../hooks/useLocation';
import TaskCard from '../components/TaskCard';
import CustomButton from '../components/CustomButton';
import { getNearestTasks } from '../utils/distance';
import { checkNearbyTasks } from '../services/NotificationService';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { tasks } = useTasks();
  const { theme } = useTheme();
  const { location, error, refresh } = useLocation({ watch: true });

  useEffect(() => {
    if (location) checkNearbyTasks(tasks, location).catch(err => console.warn(err));
  }, [location, tasks]);

  useFocusEffect(React.useCallback(() => {
    refresh();
  }, [refresh]));

  const nearest = getNearestTasks(tasks, location, 3);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.heading, { color: theme.text }]}>Minhas tarefas</Text>
      <Text style={{ color: theme.muted, marginBottom: 18 }}>
        {location ? 'Estas são as tarefas pendentes mais próximas.' : 'Ative a localização para calcular as distâncias.'}
      </Text>

      <CustomButton title="+ Adicionar tarefa" onPress={() => navigation.navigate('Adicionar tarefa')} />

      <Text style={[styles.section, { color: theme.text }]}>Mais próximas de você</Text>
      {error ? <Text style={{ color: '#C0392B', marginBottom: 10 }}>{error}</Text> : null}
      {nearest.length === 0 ? (
        <Text style={{ color: theme.muted }}>Nenhuma tarefa pendente com localização disponível.</Text>
      ) : nearest.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          distance={task.distance}
          onPress={() => navigation.navigate('Detalhes da tarefa', { taskId: task.id })}
        />
      ))}

      <Text style={[styles.section, { color: theme.text }]}>Todas as tarefas</Text>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onPress={() => navigation.navigate('Detalhes da tarefa', { taskId: task.id })}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 25 },
  heading: { fontSize: 28, fontWeight: '800', marginBottom: 5 },
  section: { fontSize: 18, fontWeight: '700', marginTop: 22, marginBottom: 12 }
});
