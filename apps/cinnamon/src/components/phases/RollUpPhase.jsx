import { useEffect } from 'react'

export function RollUpPhase({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="phase rolling-phase">
      <div className="rolling-bg" />
      <h1 className="title">Rolling it Up…</h1>
      <p className="subtitle">Tightly rolling the filled dough into a log</p>

      <div className="rollup-scene">
        {/* Flat dough that "rolls" up */}
        <div className="rollup-dough">
          <svg width="520" height="90" viewBox="0 0 520 90" fill="none">
            {/* Filled dough slab */}
            <rect x="0" y="8" width="520" height="74" rx="12" fill="#F5DBA0" stroke="#D4AA60" strokeWidth="2" />
            <rect x="0" y="8" width="520" height="74" rx="12" fill="#8B4513" opacity="0.22" />
            {[60, 160, 260, 360, 460].map((x, i) => (
              <path key={i} d={`M${x} 24 Q${x+20} 45 ${x+40} 24 Q${x+60} 4 ${x+80} 24`}
                stroke="#5C2D0A" strokeWidth="1.5" fill="none" opacity="0.3" />
            ))}
          </svg>
        </div>

        {/* Rolled log that grows */}
        <div className="rollup-log">
          <svg width="200" height="90" viewBox="0 0 200 90" fill="none">
            <ellipse cx="100" cy="80" rx="80" ry="12" fill="#c8853a" opacity="0.18" />
            <rect x="10" y="8" width="180" height="64" rx="18" fill="#E8C87A" stroke="#D4AA60" strokeWidth="2.5" />
            <rect x="12" y="10" width="176" height="22" rx="10" fill="white" opacity="0.18" />
            {/* Spiral end view */}
            <ellipse cx="18" cy="40" rx="8" ry="32" fill="#F5DBA0" stroke="#D4AA60" strokeWidth="2" />
            <ellipse cx="18" cy="40" rx="5" ry="22" fill="none" stroke="#C4903A" strokeWidth="1.5" strokeDasharray="4 3" />
            <ellipse cx="18" cy="40" rx="2" ry="10" fill="none" stroke="#A06020" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" style={{ animationDuration: '2.5s' }} />
      </div>
    </div>
  )
}
