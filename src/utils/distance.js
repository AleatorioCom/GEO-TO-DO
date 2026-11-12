// Distância aproximada entre duas coordenadas, em metros (fórmula de Haversine).
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000;
  const toRadians = value => (value * Math.PI) / 180;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * earthRadius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(meters) {
  if (!Number.isFinite(meters)) return 'Distância indisponível';
  return meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1).replace('.', ',')} km`;
}

export function getNearestTasks(tasks, location, limit = 3) {
  if (!location) return [];
  return tasks
    .filter(task => !task.completed)
    .map(task => ({
      ...task,
      distance: calculateDistance(
        location.latitude, location.longitude,
        task.latitude, task.longitude
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}
