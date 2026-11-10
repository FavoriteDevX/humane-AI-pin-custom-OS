import React from 'react';

interface MacAppIconProps {
  type: string;
  size?: number; // pixel width & height (e.g., 48, 64, 80, 128, 256)
  className?: string;
  showShadow?: boolean;
}

export const MacAppIcon: React.FC<MacAppIconProps> = ({
  type,
  size = 64,
  className = '',
  showShadow = true,
}) => {
  // macOS squircle radius ratio is ~22.37% of size
  const cornerRadius = size * 0.2237;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: `${cornerRadius}px`,
        boxShadow: showShadow
          ? `0 ${size * 0.08}px ${size * 0.18}px rgba(0,0,0,0.32), 0 ${size * 0.02}px ${size * 0.06}px rgba(0,0,0,0.22)`
          : 'none',
      }}
      className={`relative select-none overflow-hidden shrink-0 transition-transform duration-200 ${className}`}
    >
      <svg
        viewBox="0 0 128 128"
        width={size}
        height={size}
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base Rim Gradient for Cupertino bezel effect */}
          <linearGradient id={`rim-light-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="8%" stopColor="#ffffff" stopOpacity="0.15" />
            <stop offset="92%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Gradients per app type */}
          <linearGradient id="grad-aether-core" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b0764" />
            <stop offset="45%" stopColor="#2e0854" />
            <stop offset="100%" stopColor="#0f0224" />
          </linearGradient>

          <linearGradient id="grad-laser-proj" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="50%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#011812" />
          </linearGradient>

          <linearGradient id="grad-palm-gest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="50%" stopColor="#075985" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          <linearGradient id="grad-acoustic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#831843" />
            <stop offset="50%" stopColor="#500724" />
            <stop offset="100%" stopColor="#23000f" />
          </linearGradient>

          <linearGradient id="grad-studio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="40%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0b092b" />
          </linearGradient>

          <linearGradient id="grad-edl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="50%" stopColor="#450a0a" />
            <stop offset="100%" stopColor="#1a0000" />
          </linearGradient>

          <linearGradient id="grad-battery" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1a0900" />
          </linearGradient>

          <linearGradient id="grad-vision-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="35%" stopColor="#818cf8" />
            <stop offset="70%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>

          <linearGradient id="grad-weather" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          <linearGradient id="grad-notes" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="15%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>

          <linearGradient id="grad-beacon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="50%" stopColor="#115e59" />
            <stop offset="100%" stopColor="#042f2e" />
          </linearGradient>

          <linearGradient id="grad-shortcuts" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="50%" stopColor="#3b0764" />
            <stop offset="100%" stopColor="#1f0238" />
          </linearGradient>

          {/* Filter for subtle 3D drop shadow inside glyphs */}
          <filter id={`glyph-shadow-${type}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* 1. App Specific Artwork Render */}
        {renderAppArtwork(type)}

        {/* 2. macOS Specular Top Edge Light and Inner Bezel Ring */}
        <rect
          x="0"
          y="0"
          width="128"
          height="128"
          fill="none"
          stroke={`url(#rim-light-${type})`}
          strokeWidth="1.5"
          rx="28.6"
        />
      </svg>
    </div>
  );
};

function renderAppArtwork(type: string) {
  switch (type) {
    case 'aether_core':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-aether-core)" />
          {/* Glowing Neural Beacon Rings */}
          <circle cx="64" cy="64" r="42" fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          <circle cx="64" cy="64" r="30" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="64" cy="64" r="18" fill="none" stroke="#e9d5ff" strokeWidth="2" strokeOpacity="0.8" />
          {/* Crystalline Prism Core */}
          <polygon
            points="64,36 88,52 88,76 64,92 40,76 40,52"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinejoin="round"
            filter="url(#glyph-shadow-aether_core)"
          />
          <polygon
            points="64,44 80,56 80,72 64,84 48,72 48,56"
            fill="#a855f7"
            fillOpacity="0.4"
          />
          <circle cx="64" cy="64" r="5" fill="#ffffff" filter="drop-shadow(0 0 6px #c084fc)" />
          {/* Corner Light Streaks */}
          <line x1="64" y1="36" x2="64" y2="44" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="88" y1="52" x2="80" y2="56" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="88" y1="76" x2="80" y2="72" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="64" y1="92" x2="64" y2="84" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="40" y1="76" x2="48" y2="72" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="40" y1="52" x2="48" y2="56" stroke="#ffffff" strokeWidth="1.5" />
        </g>
      );

    case 'laser_projector':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-laser-proj)" />
          {/* Laser Scanlines Matrix */}
          <g opacity="0.25">
            {[20, 28, 36, 44, 52, 60, 68, 76, 84, 90, 98, 106].map((y) => (
              <line key={y} x1="16" y1={y} x2="112" y2={y} stroke="#00ff66" strokeWidth="0.8" />
            ))}
          </g>
          {/* Diverging Laser Beam */}
          <polygon
            points="64,30 102,96 26,96"
            fill="#00ff66"
            fillOpacity="0.18"
          />
          {/* Laser Emitter Lens */}
          <circle cx="64" cy="30" r="12" fill="#022c22" stroke="#00ff66" strokeWidth="2" />
          <circle cx="64" cy="30" r="5" fill="#ffffff" filter="drop-shadow(0 0 8px #00ff66)" />
          {/* Concentric Scan Rings on Projection Plane */}
          <ellipse cx="64" cy="94" rx="34" ry="10" fill="none" stroke="#00ff66" strokeWidth="2.5" filter="drop-shadow(0 0 6px #00ff66)" />
          <ellipse cx="64" cy="94" rx="20" ry="6" fill="#00ff66" fillOpacity="0.4" />
          <line x1="64" y1="35" x2="64" y2="88" stroke="#ffffff" strokeWidth="1.8" strokeDasharray="3 3" />
        </g>
      );

    case 'palm_gestures':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-palm-gest)" />
          {/* Radar Distance Arcs */}
          <path d="M 28 36 A 50 50 0 0 1 100 36" fill="none" stroke="#00d2ff" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="4 4" />
          <path d="M 36 48 A 38 38 0 0 1 92 48" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeOpacity="0.6" />
          <path d="M 46 60 A 24 24 0 0 1 82 60" fill="none" stroke="#ffffff" strokeWidth="3" filter="drop-shadow(0 0 6px #00d2ff)" />
          {/* Palm Silhouette Gesture Target */}
          <path
            d="M 50 72 C 50 68, 54 68, 54 72 L 54 78 C 54 74, 58 74, 58 78 L 58 80 C 58 76, 62 76, 62 80 L 62 84 C 62 82, 66 82, 66 86 L 66 94 C 66 102, 54 104, 46 96 L 44 94 C 42 92, 44 88, 48 90 L 50 92 Z"
            fill="#ffffff"
            filter="url(#glyph-shadow-palm_gestures)"
            transform="scale(1.15) translate(4, -8)"
          />
          {/* Gesture Pinch Ring Indicator */}
          <circle cx="86" cy="74" r="8" fill="none" stroke="#00ff66" strokeWidth="2" />
          <circle cx="86" cy="74" r="3" fill="#00ff66" />
        </g>
      );

    case 'acoustic_mic':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-acoustic)" />
          {/* Soundwave Arcs */}
          <path d="M 32 46 C 24 56, 24 72, 32 82" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
          <path d="M 22 38 C 10 52, 10 76, 22 90" fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          <path d="M 96 46 C 104 56, 104 72, 96 82" fill="none" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
          <path d="M 106 38 C 118 52, 118 76, 106 90" fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.5" />
          {/* Microphone Capsule */}
          <rect x="54" y="36" width="20" height="36" rx="10" fill="#ffffff" filter="url(#glyph-shadow-acoustic)" />
          {/* Mic Stand / Cradle */}
          <path d="M 46 54 C 46 72, 82 72, 82 54" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <line x1="64" y1="72" x2="64" y2="88" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="50" y1="88" x2="78" y2="88" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      );

    case 'vision_camera':
      return (
        <g>
          {/* Vibrant Pastel Multi-Gradient Background */}
          <rect width="128" height="128" fill="url(#grad-vision-bg)" />
          {/* Frosted Aperture Ring */}
          <circle cx="64" cy="64" r="38" fill="#18181b" stroke="#ffffff" strokeWidth="3" strokeOpacity="0.8" filter="url(#glyph-shadow-vision_camera)" />
          {/* Camera Lens Blades */}
          <circle cx="64" cy="64" r="28" fill="#09090b" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="64" cy="64" r="18" fill="#0284c7" fillOpacity="0.4" />
          {/* Specular Lens Reflection */}
          <ellipse cx="56" cy="54" rx="8" ry="4" transform="rotate(-30 56 54)" fill="#ffffff" fillOpacity="0.7" />
          {/* Lens Center */}
          <circle cx="64" cy="64" r="7" fill="#ffffff" />
        </g>
      );

    case 'battery_booster':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-battery)" />
          {/* Outer Battery Shell */}
          <rect x="36" y="32" width="56" height="72" rx="12" fill="#1c1917" stroke="#f59e0b" strokeWidth="3" filter="url(#glyph-shadow-battery)" />
          <rect x="52" y="24" width="24" height="8" rx="3" fill="#f59e0b" />
          {/* Dual Cell Split Divider (Internal + Booster) */}
          <line x1="40" y1="68" x2="88" y2="68" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* High-Voltage Lightning Bolt */}
          <polygon
            points="68,40 50,64 62,64 56,88 78,60 66,60"
            fill="#fbbf24"
            filter="drop-shadow(0 0 6px #f59e0b)"
          />
          {/* Magnetic Dock Contact Pins */}
          <circle cx="48" cy="94" r="3" fill="#ffffff" />
          <circle cx="64" cy="94" r="3" fill="#ffffff" />
          <circle cx="80" cy="94" r="3" fill="#ffffff" />
        </g>
      );

    case 'aether_studio':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-studio)" />
          {/* Grid lines resembling IDE / blueprint */}
          <g opacity="0.15">
            <line x1="20" y1="20" x2="108" y2="108" stroke="#ffffff" strokeWidth="1" />
            <line x1="20" y1="108" x2="108" y2="20" stroke="#ffffff" strokeWidth="1" />
            <circle cx="64" cy="64" r="36" fill="none" stroke="#ffffff" strokeWidth="1" />
          </g>
          {/* Cross Tools: Hammer / Screwdriver & Laser Pointer */}
          <g filter="url(#glyph-shadow-studio)">
            {/* Hammer / Flash Tool */}
            <rect x="42" y="38" width="44" height="16" rx="4" fill="#94a3b8" />
            <rect x="60" y="52" width="8" height="48" rx="3" fill="#cbd5e1" />
            <circle cx="64" cy="92" r="6" fill="#6366f1" />
            {/* Terminal Prompt Chevron */}
            <path d="M 38 68 L 48 76 L 38 84" fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="52" y1="84" x2="62" y2="84" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      );

    case 'edl_recovery':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-edl)" />
          {/* Emergency Triangle Badge */}
          <polygon
            points="64,28 104,96 24,96"
            fill="#dc2626"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
            filter="url(#glyph-shadow-edl)"
          />
          {/* Qualcomm Chip / USB Icon */}
          <rect x="52" y="58" width="24" height="24" rx="4" fill="#ffffff" />
          <path d="M 64 64 L 64 74" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <circle cx="64" cy="78" r="2" fill="#dc2626" />
          <text x="64" y="50" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">9008</text>
        </g>
      );

    case 'laser_notes':
      return (
        <g>
          {/* Yellow Legal Pad Background */}
          <rect width="128" height="128" fill="#ffffff" />
          <rect width="128" height="28" fill="#f59e0b" />
          {/* Spiral / Perforation Dots */}
          {[24, 40, 56, 72, 88, 104].map((x) => (
            <circle key={x} cx={x} cy="14" r="3" fill="#78350f" />
          ))}
          {/* Blue Note Lines */}
          {[48, 66, 84, 102].map((y) => (
            <line key={y} x1="22" y1={y} x2="106" y2={y} stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          ))}
          {/* Laser Cursor Point */}
          <circle cx="82" cy="84" r="5" fill="#00ff66" filter="drop-shadow(0 0 6px #00ff66)" />
        </g>
      );

    case 'beacon_led':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-beacon)" />
          {/* Capsule Beacon Glass Window */}
          <rect x="36" y="44" width="56" height="40" rx="20" fill="#0f172a" stroke="#2dd4bf" strokeWidth="3" filter="url(#glyph-shadow-beacon)" />
          {/* Three RGB LED Diodes */}
          <circle cx="48" cy="64" r="8" fill="#22c55e" filter="drop-shadow(0 0 8px #22c55e)" />
          <circle cx="64" cy="64" r="8" fill="#eab308" filter="drop-shadow(0 0 8px #eab308)" />
          <circle cx="80" cy="64" r="8" fill="#ffffff" filter="drop-shadow(0 0 8px #ffffff)" />
        </g>
      );

    case 'weather_palm':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-weather)" />
          {/* Sun with Rays */}
          <circle cx="76" cy="48" r="18" fill="#fde047" filter="drop-shadow(0 0 10px #f59e0b)" />
          {/* Soft White Cloud */}
          <g filter="url(#glyph-shadow-weather)">
            <ellipse cx="50" cy="76" rx="22" ry="14" fill="#ffffff" />
            <circle cx="64" cy="68" r="16" fill="#ffffff" />
            <circle cx="40" cy="78" r="12" fill="#ffffff" />
          </g>
          {/* Laser Temperature readout */}
          <text x="64" y="108" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">72°</text>
        </g>
      );

    case 'shortcuts_bus':
      return (
        <g>
          <rect width="128" height="128" fill="url(#grad-shortcuts)" />
          {/* Overlapping Rounded Rhombus Diamonds (Apple Shortcuts Style) */}
          <g filter="url(#glyph-shadow-shortcuts)">
            {/* Bottom Cyan Diamond */}
            <rect x="36" y="52" width="46" height="46" rx="14" transform="rotate(-30 59 75)" fill="#06b6d4" fillOpacity="0.85" />
            {/* Top Pink/Purple Diamond */}
            <rect x="46" y="30" width="46" height="46" rx="14" transform="rotate(-30 69 53)" fill="#ec4899" fillOpacity="0.9" />
          </g>
        </g>
      );

    default:
      return (
        <g>
          <rect width="128" height="128" fill="#1e293b" />
          <circle cx="64" cy="64" r="28" fill="#64748b" />
        </g>
      );
  }
}
