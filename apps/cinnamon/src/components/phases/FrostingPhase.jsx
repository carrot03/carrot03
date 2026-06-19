import { useState } from 'react'
import { playSpread, playPop } from '../../hooks/useAudio'
import { CinnamonRoll } from '../CinnamonRoll'
import * as Ingr from '../Ingredients'

const FROSTING_ITEMS = [
  { id: 'creamcheese', Component: Ingr.CreamCheese,    label: 'Cream Cheese',    required: true  },
  { id: 'powsugar',    Component: Ingr.PowderedSugar,  label: 'Powdered Sugar',  required: true  },
  { id: 'vanilla',     Component: Ingr.VanillaExtract, label: 'Vanilla Extract', required: false },
]

const REQUIRED = FROSTING_ITEMS.filter(i => i.required).map(i => i.id)

function BowlSVG({ items }) {
  const hasCheese = items.includes('creamcheese')
  const hasSugar  = items.includes('powsugar')
  const hasVanilla = items.includes('vanilla')
  return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
      {/* Bowl shadow */}
      <ellipse cx="70" cy="114" rx="55" ry="8" fill="#C8853A" opacity="0.15" />
      {/* Bowl body */}
      <path d="M15 40 Q15 100 70 100 Q125 100 125 40 Z" fill={hasCheese ? '#FFF5E8' : '#E8E0D4'} stroke="#C8B090" strokeWidth="2" />
      {/* Bowl rim */}
      <ellipse cx="70" cy="40" rx="55" ry="16" fill={hasCheese ? '#FFF8F0' : '#EEE8E0'} stroke="#C8B090" strokeWidth="2" />
      {/* Contents */}
      {hasCheese && (
        <ellipse cx="70" cy="55" rx="44" ry="14" fill="#FFF8F0" opacity="0.9" />
      )}
      {hasSugar && (
        <>
          <ellipse cx="70" cy="52" rx="38" ry="10" fill="white" opacity="0.85" />
          {[50,65,80,58,78].map((x, i) => (
            <circle key={i} cx={x} cy={50 + (i % 3) * 5} r={2 + (i % 2)} fill="white" opacity="0.7" />
          ))}
        </>
      )}
      {hasVanilla && (
        <path d="M58 48 Q70 58 82 48" stroke="#8B6914" strokeWidth="2" fill="none" opacity="0.6" />
      )}
      {/* Swirl when all ready */}
      {hasCheese && hasSugar && (
        <path d="M50 55 Q60 45 70 55 Q80 65 90 55" stroke="#E8D0A0" strokeWidth="2.5" fill="none" opacity="0.5" />
      )}
    </svg>
  )
}

export function FrostingPhase({ cutCount, onComplete }) {
  const [step, setStep] = useState('mixing')   // 'mixing' | 'pouring' | 'poured'
  const [inBowl, setInBowl] = useState([])
  const [pouredCount, setPouredCount] = useState(0)

  const rollCount = Math.min(cutCount + 1, 6)
  const hasAllRequired = REQUIRED.every(id => inBowl.includes(id))

  const addToBowl = (id) => {
    if (inBowl.includes(id)) return
    playPop()
    setInBowl(prev => [...prev, id])
  }

  const startPouring = () => {
    playSpread()
    setStep('pouring')
    // Animate frosting one roll at a time
    let count = 0
    const interval = setInterval(() => {
      count++
      setPouredCount(count)
      if (count >= rollCount) {
        clearInterval(interval)
        setTimeout(() => setStep('poured'), 600)
      }
    }, 380)
  }

  return (
    <div className="phase frosting-phase">
      <div className="done-bg" />
      <h1 className="title">
        {step === 'mixing' ? 'Make the Frosting' : step === 'pouring' ? 'Pouring…' : 'Perfectly Frosted!'}
      </h1>
      <p className="subtitle">
        {step === 'mixing'  && 'Add ingredients to the bowl · ★ required'}
        {step === 'pouring' && 'Drizzling cream cheese frosting over every roll…'}
        {step === 'poured'  && 'Warm, gooey, perfectly frosted cinnamon rolls!'}
      </p>

      {step === 'mixing' && (
        <div className="frosting-mixing">
          {/* Ingredient cards */}
          <div className="filling-cards">
            {FROSTING_ITEMS.map(({ id, Component, label, required }) => {
              const added = inBowl.includes(id)
              return (
                <button
                  key={id}
                  className={`filling-card${added ? ' applied' : ''}${required ? ' req-card' : ''}`}
                  onClick={() => addToBowl(id)}
                  disabled={added}
                >
                  <Component size={0.7} />
                  <span className="card-label">{label}{required ? ' ★' : ''}</span>
                  {added && <span className="card-check">✓</span>}
                </button>
              )
            })}
          </div>

          {/* Mixing bowl */}
          <div className="frosting-bowl">
            <BowlSVG items={inBowl} />
            <p className="bowl-label">
              {inBowl.length === 0 ? 'Empty bowl' : `${inBowl.length} ingredient${inBowl.length !== 1 ? 's' : ''} added`}
            </p>
          </div>

          {hasAllRequired ? (
            <button className="phase-btn" onClick={startPouring}>
              Pour the Frosting! →
            </button>
          ) : (
            <p className="hint">Still need: {REQUIRED.filter(id => !inBowl.includes(id)).map(id => FROSTING_ITEMS.find(i => i.id === id)?.label).join(' and ')}</p>
          )}
        </div>
      )}

      {(step === 'pouring' || step === 'poured') && (
        <div className="frosting-rolls">
          <div
            className="rolls-grid"
            style={{ gridTemplateColumns: `repeat(${rollCount <= 3 ? rollCount : Math.ceil(rollCount / 2)}, 1fr)` }}
          >
            {Array.from({ length: rollCount }).map((_, i) => (
              <div key={i} className="done-roll" style={{ animationDelay: `${i * 0.1}s` }}>
                {i < pouredCount && (
                  <div className="frosting-pour-anim" style={{ animationDelay: `${i * 0.05}s` }}>
                    <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                      <path d="M20 0 Q25 20 20 30 Q15 40 22 50" stroke="#FFF5E8" strokeWidth="5" strokeLinecap="round" fill="none"
                        style={{ animation: 'drip-path 0.5s ease-out' }} />
                      <path d="M40 0 Q38 15 42 28 Q44 40 38 50" stroke="#FFF0E0" strokeWidth="6" strokeLinecap="round" fill="none"
                        style={{ animation: 'drip-path 0.5s 0.08s ease-out both' }} />
                      <path d="M60 0 Q58 18 62 30 Q64 42 58 50" stroke="#FFF5E8" strokeWidth="4" strokeLinecap="round" fill="none"
                        style={{ animation: 'drip-path 0.5s 0.15s ease-out both' }} />
                    </svg>
                  </div>
                )}
                <CinnamonRoll />
                {i < pouredCount && (
                  <div className="frosting-coat">
                    <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
                      <ellipse cx="50" cy="15" rx="46" ry="12" fill="#FFF5E8" opacity="0.88" />
                      <path d="M10 18 Q22 26 36 20 Q50 28 64 20 Q76 26 90 18" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {step === 'poured' && (
            <button className="phase-btn golden-btn" onClick={() => onComplete({ frosting: inBowl })}>
              Serve! →
            </button>
          )}
        </div>
      )}
    </div>
  )
}
