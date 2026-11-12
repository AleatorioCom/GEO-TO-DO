import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { subscribeToLightSensor } from '../services/SensorService';

const ThemeContext = createContext(null);

const palettes = {
  light: { mode: 'light', background: '#F7F2EA', surface: '#FFFFFF', text: '#302A28', muted: '#766D68', primary: '#7B263A', border: '#E7DDD3' },
  dark: { mode: 'dark', background: '#191719', surface: '#282328', text: '#F5ECEE', muted: '#B9AEB2', primary: '#D58A9B', border: '#443A40' }
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [automatic, setAutomatic] = useState(false);

  useEffect(() => {
    if (!automatic) return undefined;
    let subscription;
    let active = true;
    subscribeToLightSensor(nextMode => {
      if (active) setMode(nextMode);
    }).then(result => { subscription = result; }).catch(() => {});
    return () => {
      active = false;
      subscription?.remove();
    };
  }, [automatic]);

  const value = useMemo(() => ({
    theme: palettes[mode],
    mode,
    automatic,
    setMode,
    setAutomatic
  }), [mode, automatic]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme deve ser usado dentro de ThemeProvider.');
  return context;
}
