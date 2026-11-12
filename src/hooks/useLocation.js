import { useCallback, useEffect, useState } from 'react';
import { getCurrentLocation, watchCurrentLocation } from '../services/LocationService';

export default function useLocation({ watch = false } = {}) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    try {
      setError('');
      const current = await getCurrentLocation();
      setLocation(current);
      return current;
    } catch (err) {
      setError(err.message || 'Erro ao obter localização.');
      return null;
    }
  }, []);

  useEffect(() => {
    let subscription;
    let active = true;

    if (watch) {
      watchCurrentLocation(nextLocation => {
        if (active) {
          setLocation(nextLocation);
          setError('');
        }
      }).then(result => {
        subscription = result;
      }).catch(err => {
        if (active) setError(err.message || 'Erro ao acompanhar localização.');
      });
    } else {
      refresh();
    }

    return () => {
      active = false;
      subscription?.remove();
    };
  }, [watch, refresh]);

  return { location, error, refresh };
}
