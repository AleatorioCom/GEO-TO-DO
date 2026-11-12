import { LightSensor } from 'expo-sensors';

// Retorna uma assinatura. O componente deve chamar subscription?.remove() ao desmontar.
export async function subscribeToLightSensor(onThemeChange) {
  const available = await LightSensor.isAvailableAsync();
  if (!available) return null;

  LightSensor.setUpdateInterval(2000);
  return LightSensor.addListener(({ illuminance }) => {
    // Limiares iniciais para demonstração; ajuste após testar no aparelho.
    if (illuminance < 30) onThemeChange('dark');
    else if (illuminance > 100) onThemeChange('light');
  });
}
