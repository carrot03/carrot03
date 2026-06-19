import { useState } from 'react'
import { Cursor } from './components/Cursor'
import { IngredientPhase } from './components/phases/IngredientPhase'
import { RollingPhase }    from './components/phases/RollingPhase'
import { FillingPhase }    from './components/phases/FillingPhase'
import { RollUpPhase }     from './components/phases/RollUpPhase'
import { CutPhase }        from './components/phases/CutPhase'
import { OvenPhase }       from './components/phases/OvenPhase'
import { FrostingPhase }   from './components/phases/FrostingPhase'
import { DonePhase }       from './components/phases/DonePhase'
import './App.css'

const PHASES = ['dough', 'rolling', 'filling', 'rollup', 'cutting', 'oven', 'frosting', 'done']

const PHASE_LABELS = {
  dough:    'Dough',
  rolling:  'Knead',
  filling:  'Fill',
  rollup:   'Roll Up',
  cutting:  'Cut',
  oven:     'Bake',
  frosting: 'Frost',
  done:     'Serve',
}

export default function App() {
  const [phase, setPhase] = useState('dough')
  const [collected, setCollected] = useState([])
  const [filling,   setFilling]   = useState([])
  const [frosting,  setFrosting]  = useState([])
  const [cutCount,  setCutCount]  = useState(0)

  const advance = (data = {}) => {
    if (phase === 'dough')    setCollected(data.collected ?? [])
    if (phase === 'filling')  setFilling(data.filling ?? [])
    if (phase === 'cutting')  setCutCount(data.cutCount ?? 0)
    if (phase === 'frosting') setFrosting(data.frosting ?? [])
    setPhase(p => PHASES[PHASES.indexOf(p) + 1] ?? p)
  }

  const restart = () => {
    setCollected([]); setFilling([]); setFrosting([]); setCutCount(0)
    setPhase('dough')
  }

  const phaseIdx = PHASES.indexOf(phase)

  return (
    <div className={`app phase-${phase}`}>
      <Cursor phase={phase} />

      {/* Step indicator */}
      <div className="step-indicator">
        {PHASES.map((p, i) => (
          <div key={p} className={`step-dot${phase === p ? ' active' : ''}${phaseIdx > i ? ' done' : ''}`}
            title={PHASE_LABELS[p]}
          />
        ))}
      </div>

      {/* Phase label */}
      <div className="phase-label">
        {PHASE_LABELS[phase]} &nbsp;{phaseIdx + 1}/{PHASES.length}
      </div>

      {phase === 'dough'    && <IngredientPhase onComplete={advance} />}
      {phase === 'rolling'  && <RollingPhase    onComplete={advance} />}
      {phase === 'filling'  && <FillingPhase    onComplete={advance} />}
      {phase === 'rollup'   && <RollUpPhase     onComplete={advance} />}
      {phase === 'cutting'  && <CutPhase        onComplete={advance} />}
      {phase === 'oven'     && <OvenPhase       cutCount={cutCount} onComplete={advance} />}
      {phase === 'frosting' && <FrostingPhase   cutCount={cutCount} onComplete={advance} />}
      {phase === 'done'     && <DonePhase       collected={collected} filling={filling} frosting={frosting} cutCount={cutCount} onRestart={restart} />}
    </div>
  )
}
