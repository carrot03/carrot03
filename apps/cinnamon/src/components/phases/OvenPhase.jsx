import { useState, useEffect } from 'react'
import { startSizzle, stopSizzle, playDing } from '../../hooks/useAudio'

const BAKE_DURATION = 5000

function OvenSVG({ state }) {
  const isHeating = state === 'heating'
  const isDone    = state === 'done'
  const doorOpen  = state === 'empty' || state === 'loading' || isDone

  return (
    <svg width="320" height="300" viewBox="0 0 320 300" fill="none">
      {/* Body */}
      <rect x="20" y="40" width="280" height="240" rx="12" fill="#2A2A2A" stroke="#444" strokeWidth="2" />
      <rect x="20" y="40" width="280" height="20" rx="8" fill="#1A1A1A" />

      {/* Control panel top */}
      <rect x="40" y="48" width="60" height="8" rx="3" fill="#3A3A3A" />
      <circle cx="56" cy="52" r="5" fill={isHeating ? '#FF6030' : '#555'} />
      <circle cx="72" cy="52" r="5" fill={isHeating ? '#FF8030' : '#555'} />
      <circle cx="88" cy="52" r="4" fill="#444" />
      <rect x="220" y="46" width="60" height="12" rx="4" fill="#3A3A3A" />
      <text x="250" y="55" textAnchor="middle" fontSize="7" fill={isHeating ? '#FF9060' : '#888'} fontFamily="monospace">
        {isHeating ? '375°F' : isDone ? 'DONE' : '---'}
      </text>

      {/* Oven door frame */}
      <rect x="36" y="76" width="248" height="188" rx="8" fill="#222" stroke="#555" strokeWidth="1.5" />

      {/* Door glass window (always visible as frame) */}
      <rect x="46" y="86" width="228" height="88" rx="6" fill={isHeating ? '#1a0a00' : '#111'} stroke="#444" strokeWidth="1" />

      {/* Heating elements inside */}
      {(isHeating || isDone) && (
        <>
          <line x1="56" y1="100" x2="260" y2="100" stroke={isHeating ? '#FF4010' : '#662010'} strokeWidth="4" strokeLinecap="round" opacity={isHeating ? 0.9 : 0.5} />
          <line x1="56" y1="115" x2="260" y2="115" stroke={isHeating ? '#FF6020' : '#882010'} strokeWidth="3" strokeLinecap="round" opacity={isHeating ? 0.7 : 0.4} />
          <line x1="56" y1="158" x2="260" y2="158" stroke={isHeating ? '#FF4010' : '#662010'} strokeWidth="4" strokeLinecap="round" opacity={isHeating ? 0.9 : 0.5} />
        </>
      )}

      {/* Glow inside when heating */}
      {isHeating && (
        <rect x="46" y="86" width="228" height="88" rx="6" fill="#FF6020" opacity="0.12" />
      )}

      {/* Rolls inside when baking or done */}
      {(isHeating || isDone) && (
        <g>
          {[75, 120, 165, 215].map((cx, i) => (
            <g key={i}>
              <circle cx={cx} cy="134" r="22"
                fill={isDone ? '#E8924A' : '#F0C87A'}
                stroke={isDone ? '#C06820' : '#D4AA60'}
                strokeWidth="2"
              />
              <circle cx={cx} cy="134" r="16"
                fill="none"
                stroke={isDone ? '#A05018' : '#C4904A'}
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />
              <circle cx={cx} cy="134" r="8"
                fill="none"
                stroke={isDone ? '#803010' : '#A06828'}
                strokeWidth="2"
              />
              {isDone && (
                <ellipse cx={cx} cy="122" rx="14" ry="6" fill="#FFF8EF" opacity="0.9" />
              )}
            </g>
          ))}
        </g>
      )}

      {/* Door lower half — slides down when open */}
      <rect
        x="36" y="184"
        width="248" height="76"
        rx="6"
        fill={doorOpen && !isDone ? '#303030' : '#222'}
        stroke="#555"
        strokeWidth="1.5"
        style={{
          transform: doorOpen && !isDone ? 'translateY(30px)' : 'translateY(0)',
          transformOrigin: '160px 260px',
          transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      />

      {/* Door handle */}
      <rect x="130" y="242" width="60" height="8" rx="4" fill="#666" stroke="#888" strokeWidth="1" />

      {/* Legs */}
      <rect x="40" y="276" width="12" height="20" rx="4" fill="#1A1A1A" />
      <rect x="268" y="276" width="12" height="20" rx="4" fill="#1A1A1A" />

      {/* Steam when done */}
      {isDone && (
        <>
          <path d="M90 80 Q94 68 90 58" stroke="#DDD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" className="steam" />
          <path d="M160 76 Q166 62 160 50" stroke="#DDD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" className="steam" style={{ animationDelay: '0.4s' }} />
          <path d="M230 80 Q234 66 230 56" stroke="#DDD" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" className="steam" style={{ animationDelay: '0.2s' }} />
        </>
      )}
    </svg>
  )
}

function RawTray({ rollCount, visible, sliding }) {
  const rolls = Math.min(rollCount + 1, 5)
  return (
    <div className={`tray${sliding ? ' tray-slide' : ''}${!visible ? ' tray-hidden' : ''}`}>
      <svg width={80 + rolls * 52} height="90" viewBox={`0 0 ${80 + rolls * 52} 90`} fill="none">
        {/* Tray */}
        <rect x="0" y="46" width={80 + rolls * 52} height="24" rx="6" fill="#A0A0A0" stroke="#808080" strokeWidth="1.5" />
        <rect x="0" y="46" width={80 + rolls * 52} height="8" rx="4" fill="#C0C0C0" />
        {/* Raw rolls on tray */}
        {Array.from({ length: rolls }).map((_, i) => (
          <g key={i}>
            <circle cx={40 + i * 52} cy="38" r="26" fill="#F5DBA0" stroke="#D4AA60" strokeWidth="2" />
            <circle cx={40 + i * 52} cy="38" r="18" fill="none" stroke="#D4AA60" strokeWidth="2" strokeDasharray="5 3" />
            <circle cx={40 + i * 52} cy="38" r="9" fill="none" stroke="#C48020" strokeWidth="2" />
            <circle cx={40 + i * 52} cy="38" r="4" fill="#A06820" />
          </g>
        ))}
      </svg>
    </div>
  )
}

export function OvenPhase({ cutCount, onComplete }) {
  const [ovenState, setOvenState] = useState('empty')   // empty | loading | heating | done
  const [progress, setProgress] = useState(0)

  const handleLoad = () => {
    setOvenState('loading')
    setTimeout(() => {
      setOvenState('heating')
      startSizzle()
      const start = Date.now()
      const tick = () => {
        const elapsed = Date.now() - start
        const pct = Math.min(elapsed / BAKE_DURATION, 1)
        setProgress(pct)
        if (pct < 1) {
          requestAnimationFrame(tick)
        } else {
          stopSizzle()
          playDing()
          setOvenState('done')
        }
      }
      requestAnimationFrame(tick)
    }, 900)
  }

  return (
    <div className="phase oven-phase">
      <div className="oven-bg" />
      <h1 className="title">{ovenState === 'done' ? 'They\'re Ready!' : 'Into the Oven'}</h1>
      <p className="subtitle">
        {ovenState === 'empty'   && 'Load your rolls and bake at 375°F'}
        {ovenState === 'loading' && 'Sliding the tray in…'}
        {ovenState === 'heating' && 'Baking… smells amazing already!'}
        {ovenState === 'done'    && 'Golden, gooey, perfect cinnamon rolls!'}
      </p>

      <div className="oven-scene">
        <OvenSVG state={ovenState} />
        <RawTray
          rollCount={cutCount}
          visible={ovenState === 'empty'}
          sliding={ovenState === 'loading'}
        />
      </div>

      {ovenState === 'heating' && (
        <div className="bake-progress">
          <div className="bake-fill" style={{ width: `${progress * 100}%` }} />
          <span className="bake-label">Baking… {Math.round(progress * 100)}%</span>
        </div>
      )}

      {ovenState === 'empty' && (
        <button className="phase-btn" onClick={handleLoad}>
          Load the Oven →
        </button>
      )}

      {ovenState === 'done' && (
        <button className="phase-btn golden-btn" onClick={onComplete}>
          Take 'em out! →
        </button>
      )}
    </div>
  )
}
