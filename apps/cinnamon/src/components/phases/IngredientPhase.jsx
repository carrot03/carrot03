import { useState, useCallback } from 'react'
import { useMouseParallax } from '../../hooks/useMouseParallax'
import { playPop } from '../../hooks/useAudio'
import * as Ingr from '../Ingredients'

const DOUGH_INGREDIENTS = [
  { id: 'flour',   Component: Ingr.FlourPuff,      label: 'Flour',   required: true,  x: -40, y: -26, depth: 0.08, rot: 10,  size: 1.0 },
  { id: 'butter',  Component: Ingr.ButterPat,      label: 'Butter',  required: true,  x: -2,  y: -47, depth: 0.06, rot: 5,   size: 1.0 },
  { id: 'egg',     Component: Ingr.Egg,            label: 'Egg',     required: true,  x: 36,  y: -30, depth: 0.07, rot: 12,  size: 1.0 },
  { id: 'milk',    Component: Ingr.Milk,           label: 'Milk',    required: true,  x: 48,  y: -6,  depth: 0.09, rot: -8,  size: 1.0 },
  { id: 'yeast',   Component: Ingr.Yeast,          label: 'Yeast',   required: true,  x: 46,  y: 18,  depth: 0.05, rot: 5,   size: 1.0 },
  { id: 'salt',    Component: Ingr.SaltShaker,     label: 'Salt',    required: true,  x: 32,  y: 40,  depth: 0.07, rot: -10, size: 1.0 },
  { id: 'sugar',   Component: Ingr.SugarCrystal,  label: 'Sugar',   required: true,  x: 2,   y: 47,  depth: 0.06, rot: -15, size: 1.0 },
  { id: 'vanilla', Component: Ingr.VanillaExtract, label: 'Vanilla', required: false, x: -36, y: -30, depth: 0.05, rot: 6,   size: 1.0 },
  { id: 'whisk',   Component: Ingr.Whisk,          label: 'Whisk',   required: false, x: -48, y: 6,   depth: 0.10, rot: 18,  size: 1.0 },
]

const REQUIRED_IDS = DOUGH_INGREDIENTS.filter(i => i.required).map(i => i.id)

export function IngredientPhase({ onComplete }) {
  const mouse = useMouseParallax()
  const [collected, setCollected] = useState([])
  const [flying, setFlying] = useState(null)

  const collect = useCallback((id) => {
    if (collected.includes(id) || flying) return
    playPop()
    setFlying(id)
    setTimeout(() => {
      setCollected(prev => [...prev, id])
      setFlying(null)
    }, 420)
  }, [collected, flying])

  const hasAllRequired = REQUIRED_IDS.every(id => collected.includes(id))
  const missingRequired = REQUIRED_IDS.filter(id => !collected.includes(id))

  return (
    <div className="phase ingredients-phase">
      <div className="bg-glow" />
      <h1 className="title">Make the Dough</h1>
      <p className="subtitle">Collect all required ingredients · optional ones add extra flavour</p>

      {DOUGH_INGREDIENTS.filter(i => !collected.includes(i.id)).map(({ id, Component, x, y, depth, rot, size, label, required }) => {
        const tx = mouse.x * depth * 400
        const ty = mouse.y * depth * 400
        const hr = (mouse.x * 8 + mouse.y * 4) * depth * 35
        const isFlying = flying === id
        return (
          <button
            key={id}
            className={`ingredient clickable${isFlying ? ' flying' : ''}${required ? ' required-item' : ''}`}
            style={{
              left: `calc(50% + ${x}vmin)`,
              top:  `calc(50% + ${y}vmin)`,
              transform: isFlying
                ? `translate(-50%, -50%) scale(0)`
                : `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot + hr}deg)`,
            }}
            onClick={() => collect(id)}
            aria-label={`Add ${label}${required ? ' (required)' : ' (optional)'}`}
          >
            <Component size={size} />
            <span className="ingredient-label">
              {label}{required ? <em> ★</em> : ''}
            </span>
          </button>
        )
      })}

      {/* Dough ball */}
      <div className="dough-center" style={{
        transform: `translate(-50%, -50%) translate(${mouse.x * 12}px, ${mouse.y * 9}px)`
      }}>
        <div className="roll-glow" />
        <svg width="190" height="190" viewBox="0 0 190 190" fill="none">
          <ellipse cx="95" cy="176" rx="65" ry="13" fill="#c8853a" opacity="0.18" />
          <circle cx="95" cy="92" r="82" fill={hasAllRequired ? '#E8C060' : '#F5DBA0'} stroke="#D4AA60" strokeWidth="3" />
          <circle cx="95" cy="92" r="72" fill="#FAE8B0" opacity="0.45" />
          <ellipse cx="72" cy="66" rx="22" ry="15" fill="white" opacity="0.18" transform="rotate(-20 72 66)" />
          {collected.length === 0 ? (
            <text x="95" y="100" textAnchor="middle" fontSize="12" fill="#C48020" opacity="0.45" fontFamily="Georgia, serif">click to add ★</text>
          ) : (
            <text x="95" y="106" textAnchor="middle" fontSize="40" fill="#C48020" opacity="0.65" fontWeight="bold">{collected.length}</text>
          )}
        </svg>

        {collected.length > 0 && (
          <div className="collected-row">
            {collected.map(id => {
              const ingr = DOUGH_INGREDIENTS.find(i => i.id === id)
              if (!ingr) return null
              const { Component } = ingr
              return (
                <div key={id} className={`collected-badge${ingr.required ? ' req-badge' : ''}`} title={ingr.label}>
                  <Component size={0.38} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Required checklist */}
      <div className="req-checklist">
        {DOUGH_INGREDIENTS.filter(i => i.required).map(({ id, label }) => (
          <span key={id} className={`req-check${collected.includes(id) ? ' got' : ''}`}>
            {collected.includes(id) ? '✓' : '○'} {label}
          </span>
        ))}
      </div>

      {hasAllRequired ? (
        <button className="phase-btn" onClick={() => onComplete({ collected })}>
          Knead & Roll! →
        </button>
      ) : (
        <p className="hint">Still need: {missingRequired.map(id => DOUGH_INGREDIENTS.find(i => i.id === id)?.label).join(', ')}</p>
      )}
    </div>
  )
}
