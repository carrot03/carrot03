let _ctx = null

function getCtx() {
  if (_ctx) return _ctx
  if (typeof window === 'undefined') return null
  _ctx = new (window.AudioContext || window.webkitAudioContext)()
  return _ctx
}

function resume(ctx) {
  if (ctx?.state === 'suspended') ctx.resume()
  return ctx
}

// White noise buffer (reusable)
function noiseBuffer(ctx, seconds = 3) {
  const n = ctx.sampleRate * seconds
  const buf = ctx.createBuffer(1, n, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1
  return buf
}

export function playPop() {
  const ctx = resume(getCtx())
  if (!ctx) return
  const osc = ctx.createOscillator()
  const g = ctx.createGain()
  osc.type = 'sine'
  osc.frequency.setValueAtTime(880, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.09)
  g.gain.setValueAtTime(0.22, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13)
  osc.connect(g); g.connect(ctx.destination)
  osc.start(); osc.stop(ctx.currentTime + 0.13)
}

export function playChop() {
  const ctx = resume(getCtx())
  if (!ctx) return
  const buf = noiseBuffer(ctx, 0.07)
  const d = buf.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] *= (1 - i / d.length) * (1 - i / d.length)
  const src = ctx.createBufferSource(); src.buffer = buf
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 600
  const g = ctx.createGain(); g.gain.value = 0.4
  src.connect(hp); hp.connect(g); g.connect(ctx.destination); src.start()
}

export function playDing() {
  const ctx = resume(getCtx())
  if (!ctx) return
  ;[880, 1108, 1320].forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'; osc.frequency.value = freq
    const t = ctx.currentTime + i * 0.07
    g.gain.setValueAtTime(0.001, t)
    g.gain.linearRampToValueAtTime(0.25, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.001, t + 1.6)
    osc.connect(g); g.connect(ctx.destination)
    osc.start(t); osc.stop(t + 1.6)
  })
}

export function playSpread() {
  const ctx = resume(getCtx())
  if (!ctx) return
  const buf = noiseBuffer(ctx, 0.18)
  const src = ctx.createBufferSource(); src.buffer = buf
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 800; bp.Q.value = 2
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.18, ctx.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
  src.connect(bp); bp.connect(g); g.connect(ctx.destination); src.start()
}

// Sizzle singleton — start / stop
let _sizzleSrc = null
let _sizzleGain = null

export function startSizzle() {
  const ctx = resume(getCtx())
  if (!ctx || _sizzleSrc) return

  const buf = noiseBuffer(ctx, 4)
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true
  const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2800; bp.Q.value = 0.5
  const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1200
  const g = ctx.createGain()
  g.gain.setValueAtTime(0, ctx.currentTime)
  g.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 1.0)

  src.connect(bp); bp.connect(hp); hp.connect(g); g.connect(ctx.destination)
  src.start()
  _sizzleSrc = src; _sizzleGain = g
}

export function stopSizzle() {
  if (!_sizzleSrc) return
  const ctx = getCtx()
  if (ctx && _sizzleGain) {
    _sizzleGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7)
  }
  const src = _sizzleSrc
  _sizzleSrc = null; _sizzleGain = null
  setTimeout(() => { try { src.stop() } catch {} }, 800)
}
