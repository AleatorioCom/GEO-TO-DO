import React from 'react';
import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';

export default function SettingsScreen() {
  const { theme, mode, setMode, automatic, setAutomatic } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.heading, { color: theme.text }]}>Configurações</Text>

      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.text, fontWeight: '700' }}>Tema automático</Text>
          <Text style={{ color: theme.muted }}>Usa o sensor de luz, quando disponível.</Text>
        </View>
        <Switch value={automatic} onValueChange={setAutomatic} />
      </View>

      <View style={styles.row}>
        <Text style={{ color: theme.text, fontWeight: '700' }}>Tema escuro</Text>
        <Switch value={mode === 'dark'} onValueChange={value => {
          setAutomatic(false);
          setMode(value ? 'dark' : 'light');
        }} />
      </View>

      <Text style={{ color: theme.muted, marginTop: 24 }}>Geo-To-Do • Lembretes por proximidade</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 27, fontWeight: '800', marginBottom: 25 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, gap: 12 }
});
