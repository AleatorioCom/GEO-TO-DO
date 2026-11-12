import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { calculateDistance } from '../utils/distance';

let insideByTask = {};

export async function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
    })
  });

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('reminders', {
      name: 'Lembretes de tarefas',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default'
    });
  }

  const current = await Notifications.getPermissionsAsync();
  if (!current.granted) {
    const requested = await Notifications.requestPermissionsAsync();
    return requested.granted;
  }
  return true;
}

// Dispara apenas na transição de fora para dentro do raio.
// O estado é mantido em memória enquanto o app estiver aberto.
export async function checkNearbyTasks(tasks, location) {
  if (!location) return [];
  const enteredTasks = [];

  for (const task of tasks) {
    if (task.completed) {
      insideByTask[task.id] = false;
      continue;
    }

    const distance = calculateDistance(
      location.latitude, location.longitude,
      task.latitude, task.longitude
    );
    const isInside = distance <= task.radius;
    const wasInside = Boolean(insideByTask[task.id]);

    if (isInside && !wasInside) {
      enteredTasks.push(task);
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Você chegou perto de uma tarefa!',
          body: task.title,
          data: { taskId: task.id }
        },
        trigger: null
      });
    }
    insideByTask[task.id] = isInside;
  }

  return enteredTasks;
}

export function resetGeofenceState(taskId) {
  if (taskId) delete insideByTask[taskId];
  else insideByTask = {};
}
