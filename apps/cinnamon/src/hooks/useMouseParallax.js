import { useState, useEffect } from 'react'

export function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      setMouse({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useEffect(() => {
    let raf
    const lerp = (a, b, t) => a + (b - a) * t
    const tick = () => {
      setSmoothMouse(prev => ({
        x: lerp(prev.x, mouse.x, 0.06),
        y: lerp(prev.y, mouse.y, 0.06),
      }))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mouse])

  return smoothMouse
}
