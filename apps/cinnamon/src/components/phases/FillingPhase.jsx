import { useState } from 'react'
import { playSpread, playPop } from '../../hooks/useAudio'
import * as Ingr from '../Ingredients'

const FILLING_ITEMS = [
  { id: 'brownsugar', Component: Ingr.BrownSugar,    label: 'Brown Sugar', required: true },
  { id: 'cinnamon',   Component: Ingr.CinnamonPowder, label: 'Cinnamon',   required: true },
  { id: 'pecans',     Component: Ingr.Pecans,          label: 'Pecans',     required: false },
  { id: 'raisins',    Component: Ingr.Raisins,         label: 'Raisins',    required: false },
]

const REQUIRED = FILLING_ITEMS.filter(i => i.required).map(i => i.id)

// Pre-computed static scatter positions so they don't shift on re-render
const PECAN_POS = [[60,30],[140,50],[240,32],[320,48],[420,34],[500,52],[80,70],[200,72],[370,68],[460,74]]
const RAISIN_POS = [[40,44],[100,26],[180,60],[260,40],[340,56],[460,30],[520,60],[130,70],[290,28],[400,66]]

function DoughVisual({ applied }) {
  const hasCinnamon   = applied.includes('cinnamon')
  const hasBrownSugar = applied.includes('brownsugar')
  const hasPecans     = applied.includes('pecans')
  const hasRaisins    = applied.includes('raisins')

  return (
    <svg width="580" height="110" viewBox="0 0 580 110" fill="none" style={{ overflow: 'visible' }}>
      {/* Shadow */}
      <ellipse cx="290" cy="106" rx="280" ry="8" fill="#c8853a" opacity="0.15" />
      {/* Dough base */}
      <rect x="0" y="8" width="580" height="90" rx="18" fill="#F5DBA0" stroke="#D4AA60" strokeWidth="2.5" />
      <rect x="8" y="10" width="564" height="24" rx="10" fill="white" opacity="0.15" />

      {/* Cinnamon layer */}
      {hasCinnamon && (
        <rect x="0" y="8" width="580" height="90" rx="18"
          fill="#8B4513" opacity="0.28"
          style={{ animation: 'fade-in-fill 0.5s ease-out' }}
        />
      )}

      {/* Brown sugar layer */}
      {hasBrownSugar && (
        <>
          <rect x="0" y="8" width="580" height="90" rx="18" fill="#A0522D" opacity="0.2" />
          {[50,110,170,230,300,360,420,480,540].map((x, i) => (
            <circle key={i} cx={x} cy={30 + (i % 3) * 22} r={3 + (i % 3)} fill="#E8C050" opacity="0.65" />
          ))}
        </>
      )}

      {/* Pecans */}
      {hasPecans && PECAN_POS.map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="14" ry="9"
          fill="#8B5E3C" stroke="#5C3010" strokeWidth="1"
          transform={`rotate(${(i * 23) % 40 - 20} ${cx} ${cy})`}
        />
      ))}

      {/* Raisins */}
      {hasRaisins && RAISIN_POS.map(([cx, cy], i) => (
        <ellipse key={i} cx={cx} cy={cy} rx="8" ry="6" fill="#4A1C00" stroke="#2E0E00" strokeWidth="0.8" />
      ))}

      {/* Cinnamon swirl details */}
      {hasCinnamon && [100, 240, 380, 500].map((x, i) => (
        <path key={i} d={`M${x} 35 Q${x+20} 55 ${x+40} 35 Q${x+60} 15 ${x+80} 35`}
          stroke="#5C2D0A" strokeWidth="1.5" fill="none" opacity="0.35" />
      ))}
    </svg>
  )
}

export function FillingPhase({ onComplete }) {
  const [applied, setApplied] = useState([])
  const [spreading, setSpreading] = useState(null)

  const apply = (id) => {
    if (applied.includes(id)) return
    playSpread()
    setSpreading(id)
    setTimeout(() => {
      setApplied(prev => [...prev, id])
      setSpreading(null)
    }, 380)
  }

  const hasAllRequired = REQUIRED.every(id => applied.includes(id))

  return (
    <div className="phase filling-phase">
      <div className="cut-bg" />
      <h1 className="title">Add the Filling</h1>
      <p className="subtitle">Spread the filling on your flat dough · ★ required</p>

      {/* Ingredient cards */}
      <div className="filling-cards">
        {FILLING_ITEMS.map(({ id, Component, label, required }) => {
          const isApplied = applied.includes(id)
          const isSpreading = spreading === id
          return (
            <button
              key={id}
              className={`filling-card${isApplied ? ' applied' : ''}${required ? ' req-card' : ''}${isSpreading ? ' spreading' : ''}`}
              onClick={() => apply(id)}
              disabled={isApplied}
            >
              <Component size={0.7} />
              <span className="card-label">{label}{required ? ' ★' : ''}</span>
              {isApplied && <span className="card-check">✓</span>}
            </button>
          )
        })}
      </div>

      {/* Flat dough with visual overlays */}
      <div className="flat-dough-wrap">
        <DoughVisual applied={applied} />
        {spreading && (
          <div className="spread-flash" />
        )}
      </div>

      {hasAllRequired ? (
        <button className="phase-btn" onClick={() => onComplete({ filling: applied })}>
          Roll it Up! →
        </button>
      ) : (
        <p className="hint">Spread {REQUIRED.filter(id => !applied.includes(id)).map(id => FILLING_ITEMS.find(i => i.id === id)?.label).join(' and ')} first</p>
      )}
    </div>
  )
}
