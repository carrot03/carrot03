"use client"

import { useCallback, useState } from "react"
import { Wifi, RefreshCw, Satellite, Clock, Cpu, HardDrive } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useModemConstellation } from "../hooks/useModemConstellation"
import { useModemFirmwareVersion } from "../hooks/useModemFirmwareVersion"
import { useModemSignalStrength } from '@/hooks/useModemSignalStrength'
// import { SimCard } from 'lucide-react';

interface ModemStatsProps {
  data: {
    status: string
    uptime: string
    ipAddress: string
    macAddress: string
    model: string
    firmwareVersion: string
    downloadSpeed?: number
    uploadSpeed?: number
    pingLatency?: number
    signalStrength?: number
    connectedDevices?: number
  }
  loading: boolean
  onRefresh?: () => void
}

export function ModemStats({ data, loading, onRefresh }: ModemStatsProps) {
  const { 
    signalStrength, 
    loading: signalLoading, 
    error: signalError 
  } = useModemSignalStrength()
  
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {
    data: constellation,
    loading: constellationLoading,
    refresh: refreshConstellation,
  } = useModemConstellation()

  const {
    data: firmware,
    loading: firmwareLoading,
    refresh: refreshFirmwareVersion,
  } = useModemFirmwareVersion()

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await Promise.all([
        onRefresh?.(),
        refreshConstellation(),
        refreshFirmwareVersion()
      ])
    } catch (error) {
      console.error("Refresh failed:", error)
    } finally {
      setIsRefreshing(false)
    }
  }, [onRefresh, refreshConstellation, refreshFirmwareVersion])

  // Derived loading states
  const anyLoading = loading || constellationLoading || firmwareLoading || signalLoading
  const anyError = signalError // Add other error sources if needed

  // Signal strength quality indicators
  const getSignalQuality = (dbm: number | undefined) => {
    if (dbm === undefined) return 'Unknown'
    if (dbm > -80) return 'Excellent'
    if (dbm > -90) return 'Good'
    if (dbm > -100) return 'Fair'
    return 'Poor'
  }

  const signalQualityVariant = (dbm: number | undefined) => {
    if (dbm === undefined) return 'default'
    if (dbm > -80) return 'default'    // Excellent - green
    if (dbm > -90) return 'secondary'  // Good - gray
    if (dbm > -100) return 'outline'   // Fair - yellow
    return 'destructive'               // Poor - red
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Modem Status</CardTitle>
          <CardDescription>
            {anyError ? (
              <span className="text-destructive">Error loading signal data</span>
            ) : (
              "Current modem status and configuration"
            )}
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing || anyLoading}
            className="h-8 w-8 p-0"
            aria-label="Refresh data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          <Badge variant="outline" className="flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            <span>Connected</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* Error state */}
        {anyError && (
          <div className="rounded bg-destructive/10 p-3 text-destructive">
            <p>Failed to load some data. Try refreshing.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Signal Strength */}
          <StatItem
            icon={<Wifi className="h-4 w-4" />}
            label="Signal Strength"
            value={signalStrength?.signalLevel ? `${signalStrength.signalLevel} dBm` : '--'}
            loading={signalLoading}
            quality={signalStrength?.signalLevel ? getSignalQuality(signalStrength.signalLevel) : undefined}
            variant={signalQualityVariant(signalStrength?.signalLevel)}
          />

          {/* Constellation Visibility */}
          <StatItem
            icon={<Satellite className="h-4 w-4" />}
            label="Satellites"
            value={signalStrength?.constellationVisible ? "Visible" : "Not visible"}
            loading={signalLoading}
            variant={signalStrength?.constellationVisible ? 'default' : 'destructive'}
          />

          {/* Uptime */}
          <StatItem
            icon={<Clock className="h-4 w-4" />}
            label="Uptime"
            value={data.uptime || '--'}
            loading={loading}
          />

          {/* IP Address */}
          <StatItem
            icon={<Cpu className="h-4 w-4" />}
            label="IP Address"
            value={data.ipAddress || '10.1.1.252'}
            loading={loading}
          />

          {/* Model */}
          <StatItem
            icon={<HardDrive className="h-4 w-4" />}
            label="Model"
            value={'Iridium Certus 9770'}
            
          />

          {/* Firmware Version */}
          <StatItem
            icon={<Cpu className="h-4 w-4" />}
            label="Firmware"
            value={firmware?.version}
            loading={firmwareLoading}
            error={firmwareLoading ? undefined : !firmware?.version ? "Unavailable" : undefined}
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface StatItemProps {
  icon: React.ReactNode
  label: string
  value?: string | number | null
  loading?: boolean
  error?: string | null
  quality?: string
  variant?: 'default' | 'secondary' | 'destructive' | 'warning'
}

function StatItem({ icon, label, value, loading, error, quality, variant = 'default' }: StatItemProps) {
  return (
    <div className="flex items-center space-x-4 rounded-md border p-3">
      <div className="flex-shrink-0 text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {label}
        </p>
        {loading ? (
          <Skeleton className="h-5 w-20" />
        ) : error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : (
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {value || '--'}
            </p>
            {quality && (
              <Badge variant={variant}>
                {quality}
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}