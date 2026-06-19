import { useState, useRef, useCallback, useEffect } from 'react'
import { playChop } from '../../hooks/useAudio'

const LOG_W = 580
const LOG_H = 110
const MIN_CUTS = 3
const MAX_CUTS = 7

export function CutPhase({ onComplete }) {
  const [cuts, setCuts] = useState([])         // normalized x values 0-1
  const [knifeX, setKnifeX] = useState(null)   // px position over log
  const [chopping, setChopping] = useState(false)
  const [overLog, setOverLog] = useState(false)
  const logRef = useRef(null)

  const getLogRelativeX = useCallback((clientX) => {
    if (!logRef.current) return null
    const rect = logRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    if (x < 0 || x > rect.width) return null
    return x / rect.width
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!logRef.current) return
    const rect = logRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    setOverLog(x >= 0 && x <= rect.width && e.clientY >= rect.top && e.clientY <= rect.bottom)
    setKnifeX(e.clientX - rect.left)
  }, [])

  const handleClick = useCallback((e) => {
    if (cuts.length >= MAX_CUTS) return
    const norm = getLogRelativeX(e.clientX)
    if (norm === null) return
    // avoid duplicate cuts within 5% of each other
    if (cuts.some(c => Math.abs(c - norm) < 0.05)) return
    playChop()
    setChopping(true)
    setTimeout(() => setChopping(false), 300)
    setCuts(prev => [...prev, norm].sort((a, b) => a - b))
  }, [cuts, getLogRelativeX])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const rollCount = cuts.length + 1
  const canBake = cuts.length >= MIN_CUTS

  // Build segments between cuts for visual separation
  const boundaries = [0, ...cuts, 1]
  const segments = boundaries.slice(0, -1).map((start, i) => ({
    start,
    end: boundaries[i + 1],
    width: (boundaries[i + 1] - start) * LOG_W,
    x: start * LOG_W + i * 3,
  }))

  return (
    <div className="phase cut-phase">
      <div className="cut-bg" />
      <h1 className="title">Slice the Roll</h1>
      <p className="subtitle">
        Click across the dough to cut your rolls · {cuts.length}/{MIN_CUTS} cuts minimum
      </p>

      <div className="log-wrapper" ref={logRef} onClick={handleClick}>
        <svg
          width={LOG_W + cuts.length * 3}
          height={LOG_H + 20}
          viewBox={`0 0 ${LOG_W + cuts.length * 3} ${LOG_H + 20}`}
          style={{ overflow: 'visible', display: 'block' }}
        >
          {/* Shadow */}
          <ellipse
            cx={(LOG_W + cuts.length * 3) / 2}
            cy={LOG_H + 18}
            rx={(LOG_W + cuts.length * 3) / 2 - 20}
            ry="8"
            fill="#c8853a"
            opacity="0.15"
          />

          {/* Dough segments */}
          {segments.map((seg, i) => {
            const isFirst = i === 0
            const isLast = i === segments.length - 1
            const rx = isFirst ? '18 0 0 18' : isLast ? '0 18 18 0' : '2'
            return (
              <g key={i}>
                {/* Segment body */}
                <rect
                  x={seg.x}
                  y="8"
                  width={seg.width - 2}
                  height={LOG_H}
                  rx={isFirst ? 18 : isLast ? 18 : 3}
                  fill="#F5DBA0"
                  stroke="#D4AA60"
                  strokeWidth="2"
                />
                {/* Highlight */}
                <rect
                  x={seg.x + 4}
                  y="12"
                  width={seg.width - 10}
                  height="18"
                  rx="6"
                  fill="white"
                  opacity="0.18"
                />
                {/* Spiral hint on each slice */}
                <ellipse
                  cx={seg.x + seg.width / 2}
                  cy={8 + LOG_H / 2}
                  rx={Math.max(4, seg.width * 0.28)}
                  ry={LOG_H * 0.28}
                  fill="none"
                  stroke="#D4AA60"
                  strokeWidth="1.5"
                  opacity="0.45"
                />
                <ellipse
                  cx={seg.x + seg.width / 2}
                  cy={8 + LOG_H / 2}
                  rx={Math.max(2, seg.width * 0.14)}
                  ry={LOG_H * 0.14}
                  fill="none"
                  stroke="#C48020"
                  strokeWidth="1.2"
                  opacity="0.35"
                />
              </g>
            )
          })}
        </svg>

        {/* Hover knife guide line */}
        {overLog && knifeX !== null && knifeX >= 0 && knifeX <= LOG_W && (
          <div
            className="knife-guide"
            style={{ left: knifeX }}
          />
        )}
      </div>

      {/* Floating knife cursor */}
      {overLog && knifeX !== null && (
        <div
          className={`knife-cursor${chopping ? ' chopping' : ''}`}
          style={{ left: (logRef.current?.getBoundingClientRect().left ?? 0) + knifeX }}
        >
          <svg width="24" height="90" viewBox="0 0 24 90" fill="none">
            <rect x="8" y="52" width="8" height="36" rx="4" fill="#5C3A10" stroke="#3A2008" strokeWidth="1.2" />
            <rect x="6" y="46" width="12" height="8" rx="2" fill="#888" stroke="#666" strokeWidth="1" />
            <path d="M12 46 L16 6 L18 6 L14 46 Z" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
            <path d="M12 46 L16 6 L12 10 Z" fill="#F0F0F0" />
            <line x1="16" y1="6" x2="12" y2="44" stroke="white" strokeWidth="0.9" opacity="0.55" />
          </svg>
        </div>
      )}

      <div className="cut-info">
        <span className="roll-count">{rollCount} roll{rollCount !== 1 ? 's' : ''}</span>
        {cuts.length < MIN_CUTS && (
          <span className="cut-hint">Make {MIN_CUTS - cuts.length} more cut{MIN_CUTS - cuts.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {canBake && (
        <button className="phase-btn" onClick={() => onComplete({ cutCount: cuts.length })}>
          Into the Oven! →
        </button>
      )}
    </div>
  )
}
