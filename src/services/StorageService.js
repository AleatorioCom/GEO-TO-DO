import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = '@geo-to-do/tasks';

export async function loadTasks() {
  try {
    const saved = await AsyncStorage.getItem(TASKS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn('Não foi possível carregar as tarefas:', error);
    return [];
  }
}

export async function saveTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn('Não foi possível salvar as tarefas:', error);
    throw error;
  }
}
