import * as Location from 'expo-location';

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === 'granted';
}

export async function getCurrentLocation() {
  const granted = await requestLocationPermission();
  if (!granted) throw new Error('Permissão de localização não concedida.');

  const result = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced
  });
  return {
    latitude: result.coords.latitude,
    longitude: result.coords.longitude
  };
}

export async function watchCurrentLocation(callback, options = {}) {
  const granted = await requestLocationPermission();
  if (!granted) throw new Error('Permissão de localização não concedida.');

  return Location.watchPositionAsync({
    accuracy: Location.Accuracy.Balanced,
    timeInterval: options.timeInterval ?? 10000,
    distanceInterval: options.distanceInterval ?? 15
  }, result => callback({
    latitude: result.coords.latitude,
    longitude: result.coords.longitude
  }));
}
