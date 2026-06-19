import { useEffect } from 'react'
import { RollingPin } from '../Ingredients'

export function RollingPhase({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2800)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="phase rolling-phase">
      <div className="rolling-bg" />
      <h1 className="title">Rolling the Dough…</h1>
      <p className="subtitle">Getting it nice and flat</p>

      <div className="rolling-scene">
        {/* Dough slab */}
        <div className="dough-slab">
          <svg width="500" height="90" viewBox="0 0 500 90" fill="none">
            <rect x="0" y="10" width="500" height="70" rx="18" fill="#F5DBA0" stroke="#D4AA60" strokeWidth="2.5" />
            <rect x="10" y="12" width="480" height="22" rx="10" fill="white" opacity="0.18" />
            {[60, 130, 200, 270, 340, 410].map((x, i) => (
              <ellipse key={i} cx={x} cy="45" rx="18" ry="26" fill="#FAE8B0" opacity="0.28" />
            ))}
          </svg>
        </div>

        {/* Rolling pin */}
        <div className="rolling-pin-anim">
          <RollingPin size={1.1} />
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-fill" />
      </div>
    </div>
  )
}
