import React, { useState } from 'react';
import { MAC_OS_APPS, MacAppItem } from '../data/macOsAppsData.ts';
import { MacAppIcon } from './MacAppIcon.tsx';

interface MacOsDockProps {
  activeAppId: string;
  onSelectApp: (app: MacAppItem) => void;
}

export const MacOsDock: React.FC<MacOsDockProps> = ({ activeAppId, onSelectApp }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 select-none">
      {/* Dock Shelf with frosted glass background */}
      <div className="relative flex items-end gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        {MAC_OS_APPS.map((app) => {
          const isSelected = activeAppId === app.id;
          const isHovered = hoveredId === app.id;

          return (
            <div
              key={app.id}
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setHoveredId(app.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -top-10 px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-100 text-[11px] font-medium border border-slate-700/80 shadow-lg pointer-events-none whitespace-nowrap z-50 animate-in fade-in zoom-in-95 duration-150">
                  {app.name}
                </div>
              )}

              {/* Icon Container with macOS magnification on hover */}
              <button
                onClick={() => onSelectApp(app)}
                className="relative transition-all duration-200 transform outline-none"
                style={{
                  transform: isHovered ? 'scale(1.22) translateY(-6px)' : isSelected ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <MacAppIcon type={app.iconType} size={48} />
              </button>

              {/* Running / Active indicator dot underneath */}
              <div
                className={`w-1 h-1 rounded-full mt-1.5 transition-all duration-200 ${
                  isSelected ? 'bg-white opacity-90 scale-125' : 'bg-slate-500 opacity-40'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
