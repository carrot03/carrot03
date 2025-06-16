// hooks/useModemFirmwareVersion.ts
import { useEffect, useState } from "react";
import { ModemClient } from "../services/modemClient";

interface FirmwareVersion {
  major: number;
  minor: number;
  patch: number;
}

interface FirmwareData {
  slot: string;
  validity: boolean;
  version: FirmwareVersion;
  hash: string;
}

export function useModemFirmwareVersion() {
  const [data, setData] = useState<FirmwareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFirmwareVersion = async () => {
    try {
      setLoading(true);
      setError(null);

      const modem = new ModemClient();
      const response = await modem.sendCommand(
        'GET',
        'firmware'  // Corrected path from 'firmwareVersion'
      );

      if (response.data) {
        setData({
          slot: response.data.slot,
          validity: response.data.validity,
          version: response.data.version,
          hash: response.data.hash
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch firmware version");
      console.error("Firmware fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFirmwareVersion();
  }, []);

  return { 
    data, 
    loading, 
    error, 
    formattedVersion: data?.version ? `${data.version.major}.${data.version.minor}.${data.version.patch}` : null,
    refresh: fetchFirmwareVersion 
  };
}