import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({ title, onPress, variant = 'primary', disabled = false }) {
  const { theme } = useTheme();
  const secondary = variant === 'secondary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: secondary ? theme.surface : theme.primary, borderColor: theme.primary, opacity: disabled ? 0.5 : 1 }
      ]}
    >
      <Text style={[styles.text, { color: secondary ? theme.primary : '#FFFFFF' }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, marginVertical: 5 },
  text: { fontSize: 16, fontWeight: '700' }
});
