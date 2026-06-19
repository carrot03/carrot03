import { useEffect, useRef } from 'react'

export function Cursor({ phase }) {
  const ref = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return
      ref.current.style.left = `${e.clientX}px`
      ref.current.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  const isCutting = phase === 'cutting'
  const isOven    = phase === 'oven'
  const isDone    = phase === 'done'

  const size   = isCutting ? 10 : 20
  const bg     = isDone    ? 'radial-gradient(circle, #FFE080 30%, #F5C07A 100%)'
               : isOven    ? 'radial-gradient(circle, #FF9040 30%, #C84010 100%)'
               : 'radial-gradient(circle, #fff8ef 30%, #f5c07a 100%)'
  const border = isDone ? '#E8A020' : isOven ? '#802010' : '#c8853a'
  const shadow = isDone
    ? '0 0 14px rgba(240,180,0,0.7)'
    : isOven
    ? '0 0 12px rgba(255,60,0,0.6)'
    : '0 0 10px rgba(200,133,58,0.5)'

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: size, height: size,
        borderRadius: '50%',
        background: bg,
        border: `2px solid ${border}`,
        boxShadow: shadow,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.15s, height 0.15s, background 0.3s',
      }}
    />
  )
}
