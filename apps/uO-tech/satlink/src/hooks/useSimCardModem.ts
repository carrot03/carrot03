import { useState, useEffect, useCallback } from 'react';
import { ModemClient } from '@/services/modemClient';
import { USE_MOCK_SIM_CARD } from '../../config'; 

interface SimCardResult {
  cardPresent: Boolean | null;
  simConnected: Boolean | null;
  iccid: string | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSimCardModem(pollInterval = 10000): SimCardResult {
  const [cardPresent, setCardPresent] = useState<Boolean | null>(null);
  const [simConnected, setSimConnected] = useState<Boolean | null>(null);
  const [iccid, seticcid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const generateMockSimCard = useCallback((): SimCardResult => {
   
    const cardPresent = true;
    const simConnected = true;
    const iccid = '12345678901234567890';
    
        return {
         cardPresent: cardPresent, 
         simConnected: simConnected, 
         iccid: iccid,
         loading: false,
         error: null,
         refresh: async () => {}
        };
  }, []);

  // Real ping measurement
  const findRealSimCard = useCallback(async (): Promise<SimCardResult> => {
    const modem = new ModemClient();
    const startTime = Date.now();
    
    try {
      const response = await modem.sendCommand('GET', 'simStatus');
      return {
        cardPresent: response.data.card_present,
        simConnected: response.data.sim_connected,
        iccid: response.data.iccid,
        loading: false,
        error: null,
        refresh: async () => {}
      };
    } catch (err) {
      throw new Error('Failed to measure ping');
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const searchSim = USE_MOCK_SIM_CARD
        ? generateMockSimCard()
        : await findRealSimCard();
      setCardPresent(searchSim.cardPresent);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setCardPresent(null);
    } finally {
      setLoading(false);
    }
  }, [findRealSimCard, generateMockSimCard]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, pollInterval);
    return () => clearInterval(interval);
  }, [refresh, pollInterval]);

  return {
    cardPresent,
    simConnected,
    iccid,
    loading,
    error,
    refresh,
  };
}