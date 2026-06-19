export function CinnamonRoll() {
  return (
    <svg width="260" height="260" viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Drop shadow */}
      <ellipse cx="130" cy="240" rx="70" ry="14" fill="#c8853a" opacity="0.25" />

      {/* Outer bun */}
      <circle cx="130" cy="128" r="102" fill="#f5c07a" stroke="#c8853a" strokeWidth="4" />

      {/* Frosting drips */}
      <path d="M80 52 Q75 68 82 80 Q78 95 88 100 Q84 115 96 118" stroke="#fff8ef" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M130 38 Q130 56 132 68 Q128 82 136 90" stroke="#fff8ef" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.85" />
      <path d="M178 54 Q183 70 176 83 Q182 98 172 106" stroke="#fff8ef" strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.85" />

      {/* Frosting pool */}
      <ellipse cx="130" cy="100" rx="64" ry="38" fill="#fff8ef" opacity="0.9" />

      {/* Spiral layers — dark rings */}
      <circle cx="130" cy="128" r="78" stroke="#c8853a" strokeWidth="9" fill="none" strokeDasharray="8 4" />
      <circle cx="130" cy="128" r="58" stroke="#b8722a" strokeWidth="8" fill="none" strokeDasharray="7 4" />
      <circle cx="130" cy="128" r="40" stroke="#a6611e" strokeWidth="7" fill="none" strokeDasharray="6 4" />
      <circle cx="130" cy="128" r="24" stroke="#8f4f10" strokeWidth="6" fill="none" strokeDasharray="5 4" />

      {/* Cinnamon fill tint on spiral */}
      <circle cx="130" cy="128" r="78" stroke="#e8a060" strokeWidth="3" fill="none" opacity="0.4" />
      <circle cx="130" cy="128" r="58" stroke="#e8a060" strokeWidth="3" fill="none" opacity="0.4" />
      <circle cx="130" cy="128" r="40" stroke="#e8a060" strokeWidth="3" fill="none" opacity="0.4" />

      {/* Center nub */}
      <circle cx="130" cy="128" r="10" fill="#7a3a08" />
      <circle cx="130" cy="128" r="5" fill="#5a2604" />

      {/* Frosting glossy overlay */}
      <ellipse cx="108" cy="82" rx="28" ry="16" fill="white" opacity="0.22" transform="rotate(-20 108 82)" />

      {/* Steam wisps */}
      <path d="M108 30 Q112 18 108 8" stroke="#c8853a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M130 22 Q136 10 130 2" stroke="#c8853a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M152 30 Q148 18 152 8" stroke="#c8853a" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  )
}
