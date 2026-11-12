import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { formatDistance } from '../utils/distance';

export default function TaskCard({ task, onPress, distance }) {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, { color: theme.text }]}>{task.title}</Text>
        {!!task.description && <Text style={{ color: theme.muted }} numberOfLines={1}>{task.description}</Text>}
        <Text style={{ color: theme.primary, marginTop: 6 }}>
          {distance == null ? `Raio: ${task.radius} m` : formatDistance(distance)}
        </Text>
      </View>
      <Text style={{ color: task.completed ? '#23844A' : theme.muted }}>
        {task.completed ? 'Concluída' : 'Pendente'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderRadius: 14, borderWidth: 1, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 }
});
