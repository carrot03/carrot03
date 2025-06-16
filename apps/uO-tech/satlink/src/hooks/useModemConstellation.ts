import { useState, useEffect, useCallback } from 'react';
import { ModemClient } from '@/services/modemClient';
import { USE_MOCK_CONSTELLATION } from '../../config'; 

interface Constellation {
  constellationVisible: Boolean | null,
  signalBars: Number | null,
  signalLevel: Number | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useModemConstellation(pollInterval = 10000): Constellation {
  const [constellationVisible, setCardConstellationVisible] = useState<Boolean | null>(null);
  const [signalBars, setSignalBars] = useState<Number | null>(null);
  const [signalLevel, setSignalLevel] = useState<Number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const generateMockConstellation = useCallback((): Constellation => {
    
    const constellation_visible = true;
    const signal_bars = 2;
    const signal_level = 3;
    
        return {
         constellationVisible: constellation_visible, 
         signalBars: signal_bars, 
         signalLevel: signal_level,
         loading: false,
         error: null,
         refresh: async () => {}
        };
  }, []);

  
  const findRealConstellation = useCallback(async (): Promise<Constellation> => {
    const modem = new ModemClient();
    const startTime = Date.now();
    
    try {
      const response = await modem.sendCommand('GET', 'constellationState');
      return {
        constellationVisible: response.data.constellation_visible,
        signalBars: response.data.signal_bars,
        signalLevel: response.data.signal_level,
        loading: false,
        error: null,
        refresh: async () => {}
      };
    } catch (err) {
      throw new Error('Failed to measure constellation');
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const searchCons = USE_MOCK_CONSTELLATION
        ? generateMockConstellation()
        : await findRealConstellation();
        setCardConstellationVisible(searchCons.constellationVisible);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCardConstellationVisible(null);
    } finally {
      setLoading(false);
    }
  }, [findRealConstellation, generateMockConstellation]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, pollInterval);
    return () => clearInterval(interval);
  }, [refresh, pollInterval]);

  return {
    constellationVisible,
    signalBars,
    signalLevel,
    loading,
    error,
    refresh,
  };
}