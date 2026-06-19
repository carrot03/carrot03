/* Illustrated ingredient SVG components */

export function CinnamonStick({ size = 1 }) {
  const s = size
  return (
    <svg width={64 * s} height={24 * s} viewBox="0 0 64 24" fill="none">
      <rect x="2" y="6" width="60" height="12" rx="6" fill="#8B4513" stroke="#5C2D0A" strokeWidth="1.5" />
      <line x1="12" y1="6" x2="12" y2="18" stroke="#5C2D0A" strokeWidth="1" opacity="0.5" />
      <line x1="22" y1="6" x2="22" y2="18" stroke="#5C2D0A" strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="6" x2="32" y2="18" stroke="#5C2D0A" strokeWidth="1" opacity="0.5" />
      <line x1="42" y1="6" x2="42" y2="18" stroke="#5C2D0A" strokeWidth="1" opacity="0.5" />
      <line x1="52" y1="6" x2="52" y2="18" stroke="#5C2D0A" strokeWidth="1" opacity="0.5" />
      <rect x="2" y="6" width="60" height="5" rx="3" fill="white" opacity="0.12" />
    </svg>
  )
}

export function FlourPuff({ size = 1 }) {
  const s = size
  return (
    <svg width={56 * s} height={44 * s} viewBox="0 0 56 44" fill="none">
      <ellipse cx="28" cy="32" rx="24" ry="10" fill="#F5F0E8" stroke="#D4CCBA" strokeWidth="1.5" />
      <ellipse cx="22" cy="24" rx="14" ry="12" fill="#FAF8F2" stroke="#D4CCBA" strokeWidth="1.5" />
      <ellipse cx="36" cy="22" rx="12" ry="11" fill="#FAF8F2" stroke="#D4CCBA" strokeWidth="1.5" />
      <ellipse cx="28" cy="16" rx="10" ry="10" fill="#FFF" stroke="#D4CCBA" strokeWidth="1.5" />
      <ellipse cx="22" cy="16" rx="5" ry="4" fill="white" opacity="0.6" />
      <circle cx="10" cy="38" r="2" fill="#F0EBE0" opacity="0.8" />
      <circle cx="46" cy="36" r="1.5" fill="#F0EBE0" opacity="0.8" />
      <circle cx="50" cy="28" r="1" fill="#F0EBE0" opacity="0.7" />
    </svg>
  )
}

export function SugarCrystal({ size = 1 }) {
  const s = size
  return (
    <svg width={40 * s} height={48 * s} viewBox="0 0 40 48" fill="none">
      <polygon points="20,2 30,14 26,28 14,28 10,14" fill="#E8F4FD" stroke="#A8D0E8" strokeWidth="1.5" />
      <polygon points="20,2 26,14 20,12 14,14" fill="white" opacity="0.5" />
      <line x1="20" y1="2" x2="20" y2="28" stroke="#A8D0E8" strokeWidth="0.8" opacity="0.5" />
      <polygon points="8,34 13,40 8,46 3,40" fill="#D6EDFA" stroke="#A8D0E8" strokeWidth="1" />
      <polygon points="32,32 37,38 32,44 27,38" fill="#D6EDFA" stroke="#A8D0E8" strokeWidth="1" />
      <polygon points="20,36 24,40 20,44 16,40" fill="#EAF5FC" stroke="#A8D0E8" strokeWidth="1" opacity="0.7" />
      <path d="M36 10 L37 8 L38 10 L36 10Z" fill="#FFE066" />
      <path d="M37 7 L37 12 M34 9 L40 9" stroke="#FFE066" strokeWidth="0.8" />
    </svg>
  )
}

export function ButterPat({ size = 1 }) {
  const s = size
  return (
    <svg width={56 * s} height={36 * s} viewBox="0 0 56 36" fill="none">
      <rect x="4" y="10" width="48" height="22" rx="3" fill="#F5CB45" stroke="#C8A000" strokeWidth="1.5" />
      <path d="M4 10 L14 4 L52 4 L52 10 Z" fill="#FAD94A" stroke="#C8A000" strokeWidth="1.5" />
      <path d="M52 10 L52 32 L56 28 L56 6 Z" fill="#DFAD00" stroke="#C8A000" strokeWidth="1.5" />
      <ellipse cx="22" cy="14" rx="10" ry="4" fill="white" opacity="0.2" transform="rotate(-10 22 14)" />
      <path d="M26 32 Q26 36 22 36" stroke="#F5CB45" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function Egg({ size = 1 }) {
  const s = size
  return (
    <svg width={40 * s} height={52 * s} viewBox="0 0 40 52" fill="none">
      <ellipse cx="20" cy="30" rx="17" ry="20" fill="#FFF5E0" stroke="#E8D5A8" strokeWidth="1.5" />
      <ellipse cx="20" cy="14" rx="13" ry="13" fill="#FFF8F0" stroke="#E8D5A8" strokeWidth="1.5" />
      <ellipse cx="13" cy="10" rx="5" ry="8" fill="white" opacity="0.3" transform="rotate(-15 13 10)" />
      <circle cx="28" cy="34" r="1.5" fill="#D4B88A" opacity="0.5" />
      <circle cx="10" cy="38" r="1" fill="#D4B88A" opacity="0.4" />
    </svg>
  )
}

export function CinnamonPowder({ size = 1 }) {
  const s = size
  return (
    <svg width={48 * s} height={48 * s} viewBox="0 0 48 48" fill="none">
      <rect x="8" y="20" width="32" height="24" rx="4" fill="#C4793A" stroke="#8B4513" strokeWidth="1.5" />
      <rect x="6" y="14" width="36" height="10" rx="3" fill="#8B4513" stroke="#5C2D0A" strokeWidth="1.5" />
      <rect x="10" y="26" width="28" height="12" rx="2" fill="#E8A060" opacity="0.5" />
      <ellipse cx="24" cy="12" rx="10" ry="5" fill="#A0522D" opacity="0.7" />
      <ellipse cx="18" cy="8" rx="6" ry="4" fill="#C4793A" opacity="0.8" />
      <ellipse cx="30" cy="9" rx="5" ry="4" fill="#C4793A" opacity="0.8" />
      <ellipse cx="24" cy="5" rx="5" ry="4" fill="#D4844A" opacity="0.9" />
      <circle cx="6" cy="14" r="2" fill="#A0522D" opacity="0.6" />
      <circle cx="40" cy="12" r="1.5" fill="#A0522D" opacity="0.6" />
    </svg>
  )
}

export function Whisk({ size = 1 }) {
  const s = size
  return (
    <svg width={36 * s} height={70 * s} viewBox="0 0 36 70" fill="none">
      <rect x="15" y="36" width="6" height="32" rx="3" fill="#8B6914" stroke="#5C4400" strokeWidth="1.2" />
      <path d="M18 36 Q8 28 10 16 Q12 6 18 4" stroke="#C0C0C0" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M18 36 Q28 28 26 16 Q24 6 18 4" stroke="#C0C0C0" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M18 36 Q6 30 8 20 Q11 10 18 8" stroke="#B0B0B0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M18 36 Q30 30 28 20 Q25 10 18 8" stroke="#B0B0B0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="18" cy="22" rx="12" ry="5" stroke="#D0D0D0" strokeWidth="1.5" fill="none" />
      <ellipse cx="18" cy="32" rx="6" ry="2.5" stroke="#D0D0D0" strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function SpiceLeaf({ size = 1 }) {
  const s = size
  return (
    <svg width={32 * s} height={44 * s} viewBox="0 0 32 44" fill="none">
      <path d="M16 42 Q2 30 4 16 Q6 4 16 2 Q26 4 28 16 Q30 30 16 42Z" fill="#4A8C3A" stroke="#2E6024" strokeWidth="1.5" />
      <path d="M16 42 L16 2" stroke="#2E6024" strokeWidth="1.2" opacity="0.6" />
      <path d="M16 32 Q9 26 8 20" stroke="#2E6024" strokeWidth="0.9" opacity="0.5" />
      <path d="M16 32 Q23 26 24 20" stroke="#2E6024" strokeWidth="0.9" opacity="0.5" />
      <ellipse cx="10" cy="14" rx="3" ry="4" fill="white" opacity="0.15" transform="rotate(-20 10 14)" />
    </svg>
  )
}

export function StarAnise({ size = 1 }) {
  const s = size
  return (
    <svg width={44 * s} height={44 * s} viewBox="0 0 44 44" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 22 22)`}>
          <ellipse cx="22" cy="10" rx="4" ry="10" fill="#7B3F00" stroke="#4A2000" strokeWidth="1" />
          <circle cx="22" cy="4" r="3" fill="#5C2D00" />
        </g>
      ))}
      <circle cx="22" cy="22" r="5" fill="#3D1A00" stroke="#2A0E00" strokeWidth="1" />
      <circle cx="22" cy="22" r="2.5" fill="#5C2D00" />
    </svg>
  )
}

/* ── New ingredients ───────────────────────────── */

export function Milk({ size = 1 }) {
  const s = size
  return (
    <svg width={32 * s} height={56 * s} viewBox="0 0 32 56" fill="none">
      <path d="M8 14 L6 48 Q6 54 16 54 Q26 54 26 48 L24 14 Z" fill="#F8F8FF" stroke="#D0D0E8" strokeWidth="1.5" />
      <path d="M9 22 L7.5 48 Q7.5 52 16 52 Q24.5 52 24.5 48 L23 22 Z" fill="white" opacity="0.85" />
      <ellipse cx="16" cy="14" rx="8" ry="3.5" fill="#F0F0FF" stroke="#D0D0E8" strokeWidth="1.5" />
      <ellipse cx="16" cy="22" rx="7" ry="2.5" fill="white" opacity="0.7" />
      <path d="M10 24 L9 44" stroke="white" strokeWidth="2.5" opacity="0.4" strokeLinecap="round" />
    </svg>
  )
}

export function BrownSugar({ size = 1 }) {
  const s = size
  return (
    <svg width={50 * s} height={44 * s} viewBox="0 0 50 44" fill="none">
      <path d="M6 22 Q6 42 25 42 Q44 42 44 22 Z" fill="#C4682A" stroke="#8B4513" strokeWidth="1.5" />
      <ellipse cx="25" cy="22" rx="19" ry="7" fill="#C4602A" stroke="#8B4513" strokeWidth="1.5" />
      <ellipse cx="25" cy="20" rx="17" ry="6" fill="#7B3A0A" opacity="0.88" />
      <ellipse cx="18" cy="18" rx="4" ry="2.5" fill="#A0522D" opacity="0.55" />
      <ellipse cx="28" cy="16" rx="5" ry="2.5" fill="#A0522D" opacity="0.55" />
      <ellipse cx="33" cy="20" rx="3.5" ry="2" fill="#A0522D" opacity="0.55" />
      <circle cx="20" cy="17" r="1.5" fill="#C4793A" opacity="0.8" />
      <circle cx="30" cy="15" r="1" fill="#C4793A" opacity="0.8" />
      <circle cx="25" cy="19" r="1.5" fill="#D4844A" opacity="0.7" />
    </svg>
  )
}

export function Yeast({ size = 1 }) {
  const s = size
  return (
    <svg width={40 * s} height={52 * s} viewBox="0 0 40 52" fill="none">
      <rect x="4" y="10" width="32" height="34" rx="4" fill="#F5E6C0" stroke="#C8A444" strokeWidth="1.5" />
      <path d="M4 16 L20 10 L36 16" stroke="#C8A444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M4 38 L20 44 L36 38" stroke="#C8A444" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="8" y="20" width="24" height="14" rx="2" fill="#E8C840" opacity="0.55" />
      <text x="20" y="31" textAnchor="middle" fontSize="10" fill="#8B6914" fontFamily="serif" fontWeight="bold">YEAST</text>
      <circle cx="10" cy="36" r="2" fill="#E8C840" opacity="0.5" />
      <circle cx="30" cy="35" r="1.5" fill="#E8C840" opacity="0.5" />
    </svg>
  )
}

export function SaltShaker({ size = 1 }) {
  const s = size
  return (
    <svg width={28 * s} height={56 * s} viewBox="0 0 28 56" fill="none">
      <path d="M8 18 Q6 50 6 52 Q6 56 14 56 Q22 56 22 52 Q22 50 20 18 Z" fill="#F0F0F0" stroke="#C0C0C0" strokeWidth="1.5" />
      <rect x="9" y="11" width="10" height="9" rx="2" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1.5" />
      <path d="M8 11 Q8 4 14 2 Q20 4 20 11 Z" fill="#C8C8C8" stroke="#A0A0A0" strokeWidth="1" />
      <circle cx="14" cy="6" r="1.2" fill="#707070" />
      <circle cx="11" cy="8.5" r="0.9" fill="#707070" />
      <circle cx="17" cy="8.5" r="0.9" fill="#707070" />
      <circle cx="13" cy="32" r="2" fill="white" opacity="0.8" />
      <circle cx="17" cy="40" r="1.5" fill="white" opacity="0.7" />
      <circle cx="12" cy="46" r="1.5" fill="white" opacity="0.7" />
    </svg>
  )
}

export function VanillaExtract({ size = 1 }) {
  const s = size
  return (
    <svg width={26 * s} height={58 * s} viewBox="0 0 26 58" fill="none">
      <path d="M7 18 Q5 50 5 52 Q5 58 13 58 Q21 58 21 52 Q21 50 19 18 Z" fill="#3D2B1A" stroke="#2A1A08" strokeWidth="1.5" />
      <rect x="8" y="11" width="10" height="9" rx="2" fill="#4A3320" stroke="#2A1A08" strokeWidth="1.5" />
      <rect x="7" y="6" width="12" height="7" rx="2.5" fill="#8B6914" stroke="#5C4400" strokeWidth="1" />
      <rect x="8" y="24" width="10" height="18" rx="1.5" fill="#F5E6B0" opacity="0.9" />
      <line x1="10" y1="28" x2="16" y2="28" stroke="#8B6914" strokeWidth="0.8" />
      <line x1="10" y1="31" x2="16" y2="31" stroke="#8B6914" strokeWidth="0.8" />
      <line x1="10" y1="34" x2="16" y2="34" stroke="#8B6914" strokeWidth="0.8" />
      <path d="M9 38 Q9 52 13 52 Q17 52 17 38 Z" fill="#6B3A1A" opacity="0.6" />
    </svg>
  )
}

export function Pecans({ size = 1 }) {
  const s = size
  return (
    <svg width={52 * s} height={42 * s} viewBox="0 0 52 42" fill="none">
      <ellipse cx="12" cy="26" rx="10" ry="7" fill="#8B5E3C" stroke="#5C3010" strokeWidth="1.2" transform="rotate(-20 12 26)" />
      <path d="M8 22 Q12 26 16 22" stroke="#5C3010" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="28" cy="20" rx="11" ry="7.5" fill="#9B6E4C" stroke="#5C3010" strokeWidth="1.2" transform="rotate(10 28 20)" />
      <path d="M24 17 Q28 21 32 17" stroke="#5C3010" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="44" cy="28" rx="9" ry="6.5" fill="#8B5E3C" stroke="#5C3010" strokeWidth="1.2" transform="rotate(-15 44 28)" />
      <path d="M40 25 Q44 29 48 25" stroke="#5C3010" strokeWidth="0.8" fill="none" opacity="0.6" />
      <ellipse cx="28" cy="38" rx="20" ry="3.5" fill="#5C3010" opacity="0.12" />
    </svg>
  )
}

export function Raisins({ size = 1 }) {
  const s = size
  const positions = [[14,12],[26,8],[38,13],[8,24],[22,20],[34,18],[46,24],[16,34],[28,30],[40,34]]
  return (
    <svg width={56 * s} height={46 * s} viewBox="0 0 56 46" fill="none">
      {positions.map(([cx, cy], i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx="7" ry="5.5" fill="#4A1C00" stroke="#2E0E00" strokeWidth="1" />
          <ellipse cx={cx - 2} cy={cy - 1.5} rx="2.5" ry="1.5" fill="#6B2E00" opacity="0.45" />
        </g>
      ))}
    </svg>
  )
}

export function CreamCheese({ size = 1 }) {
  const s = size
  return (
    <svg width={58 * s} height={42 * s} viewBox="0 0 58 42" fill="none">
      <rect x="4" y="12" width="48" height="24" rx="3" fill="#FFF5E4" stroke="#D4C0A0" strokeWidth="1.5" />
      <path d="M4 12 L14 5 L54 5 L54 12 Z" fill="#FFF9F0" stroke="#D4C0A0" strokeWidth="1.5" />
      <path d="M54 12 L54 36 L58 32 L58 8 Z" fill="#EDE0C8" stroke="#D4C0A0" strokeWidth="1.5" />
      <rect x="4" y="12" width="48" height="6" fill="#B8C8D8" opacity="0.35" />
      <rect x="4" y="30" width="48" height="6" fill="#B8C8D8" opacity="0.35" />
      <ellipse cx="22" cy="18" rx="9" ry="3" fill="white" opacity="0.28" transform="rotate(-5 22 18)" />
    </svg>
  )
}

export function PowderedSugar({ size = 1 }) {
  const s = size
  return (
    <svg width={50 * s} height={54 * s} viewBox="0 0 50 54" fill="none">
      <path d="M10 22 Q8 50 8 52 Q8 56 25 56 Q42 56 42 52 Q42 50 40 22 Z" fill="#F8F4EE" stroke="#D8D0C0" strokeWidth="1.5" />
      <path d="M13 22 Q19 15 25 17 Q31 15 37 22" stroke="#C8C0B0" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="19" y="11" width="12" height="8" rx="2" fill="#E8E0D0" stroke="#C8C0B0" strokeWidth="1" />
      <ellipse cx="25" cy="9" rx="9" ry="5" fill="white" opacity="0.9" />
      <ellipse cx="19" cy="7" rx="6" ry="4" fill="white" opacity="0.8" />
      <ellipse cx="31" cy="7" rx="6" ry="4" fill="white" opacity="0.8" />
      <rect x="11" y="30" width="28" height="14" rx="2" fill="#F0E8D8" opacity="0.65" />
      <circle cx="8" cy="22" r="2" fill="white" opacity="0.7" />
      <circle cx="42" cy="20" r="1.5" fill="white" opacity="0.7" />
    </svg>
  )
}

export function RollingPin({ size = 1 }) {
  const s = size
  return (
    <svg width={110 * s} height={36 * s} viewBox="0 0 110 36" fill="none">
      <rect x="2" y="12" width="20" height="12" rx="6" fill="#8B6914" stroke="#5C4400" strokeWidth="1.5" />
      <rect x="88" y="12" width="20" height="12" rx="6" fill="#8B6914" stroke="#5C4400" strokeWidth="1.5" />
      <rect x="20" y="7" width="70" height="22" rx="11" fill="#C8A040" stroke="#8B6914" strokeWidth="1.5" />
      <rect x="22" y="9" width="66" height="8" rx="5" fill="white" opacity="0.18" />
      <ellipse cx="20" cy="18" rx="5" ry="11" fill="#A8801A" stroke="#5C4400" strokeWidth="1" />
      <ellipse cx="90" cy="18" rx="5" ry="11" fill="#A8801A" stroke="#5C4400" strokeWidth="1" />
    </svg>
  )
}

export function Knife({ size = 1 }) {
  const s = size
  return (
    <svg width={20 * s} height={80 * s} viewBox="0 0 20 80" fill="none">
      {/* Handle */}
      <rect x="6" y="44" width="8" height="34" rx="4" fill="#5C3A10" stroke="#3A2008" strokeWidth="1.2" />
      <line x1="6" y1="54" x2="14" y2="54" stroke="#3A2008" strokeWidth="0.8" opacity="0.5" />
      <line x1="6" y1="62" x2="14" y2="62" stroke="#3A2008" strokeWidth="0.8" opacity="0.5" />
      {/* Guard */}
      <rect x="4" y="40" width="12" height="6" rx="2" fill="#808080" stroke="#606060" strokeWidth="1" />
      {/* Blade */}
      <path d="M10 40 L14 4 L16 4 L12 40 Z" fill="#D0D0D0" stroke="#A0A0A0" strokeWidth="1" />
      <path d="M10 40 L14 4 L10 8 Z" fill="#E8E8E8" />
      {/* Edge glint */}
      <line x1="14" y1="4" x2="10" y2="38" stroke="white" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}
