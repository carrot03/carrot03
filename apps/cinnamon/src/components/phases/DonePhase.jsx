import { CinnamonRoll } from '../CinnamonRoll'
import { useMouseParallax } from '../../hooks/useMouseParallax'

const SPARKLE_POS = [
  { x: '10%', y: '15%', delay: '0s',    size: 18 },
  { x: '85%', y: '12%', delay: '0.3s',  size: 14 },
  { x: '18%', y: '75%', delay: '0.6s',  size: 16 },
  { x: '80%', y: '72%', delay: '0.15s', size: 20 },
  { x: '50%', y: '8%',  delay: '0.45s', size: 12 },
  { x: '6%',  y: '44%', delay: '0.8s',  size: 14 },
  { x: '94%', y: '38%', delay: '0.2s',  size: 11 },
  { x: '36%', y: '85%', delay: '0.55s', size: 16 },
  { x: '66%', y: '82%', delay: '0.9s',  size: 12 },
  { x: '28%', y: '10%', delay: '0.35s', size: 10 },
  { x: '72%', y: '22%', delay: '0.7s',  size: 13 },
]

export function DonePhase({ collected, filling, frosting, cutCount, onRestart }) {
  const mouse = useMouseParallax()
  const rollCount = Math.min(cutCount + 1, 6)
  const cols = rollCount <= 3 ? rollCount : Math.ceil(rollCount / 2)
  const totalIngredients = (collected?.length ?? 0) + (filling?.length ?? 0) + (frosting?.length ?? 0)

  return (
    <div className="phase done-phase">
      <div className="done-bg" />

      {SPARKLE_POS.map((sp, i) => (
        <div key={i} className="sparkle"
          style={{ left: sp.x, top: sp.y, animationDelay: sp.delay, width: sp.size, height: sp.size }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
              fill="#FFD060" stroke="#FFA020" strokeWidth="0.5" />
          </svg>
        </div>
      ))}

      <h1 className="title done-title">Fresh from the Oven!</h1>
      <p className="subtitle">
        {rollCount} frosted cinnamon roll{rollCount !== 1 ? 's' : ''}
        {totalIngredients > 0 && ` · ${totalIngredients} ingredients used`}
      </p>

      <div
        className="rolls-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          transform: `translate(${mouse.x * 8}px, ${mouse.y * 6}px)`,
        }}
      >
        {Array.from({ length: rollCount }).map((_, i) => (
          <div key={i} className="done-roll" style={{ animationDelay: `${i * 0.1}s` }}>
            {/* Cream cheese frosting coat */}
            <div className="done-frosting">
              <svg width="100" height="32" viewBox="0 0 100 32" fill="none">
                <ellipse cx="50" cy="14" rx="46" ry="11" fill="#FFF5E8" opacity="0.92" />
                <path d="M8 16 Q22 25 38 18 Q52 26 66 18 Q78 25 92 16"
                  stroke="white" strokeWidth="2.5" fill="none" opacity="0.65" />
                {/* Drip detail */}
                <path d="M30 24 Q32 30 28 32" stroke="#FFF5E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
                <path d="M60 25 Q62 31 58 32" stroke="#FFF5E8" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
              </svg>
            </div>
            <CinnamonRoll />
          </div>
        ))}
      </div>

      <button className="phase-btn restart-btn" onClick={onRestart}>
        ↺ Bake Another Batch
      </button>
    </div>
  )
}
