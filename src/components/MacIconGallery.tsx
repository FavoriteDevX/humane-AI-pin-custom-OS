import React, { useState } from 'react';
import { MAC_OS_APPS, MacAppItem } from '../data/macOsAppsData.ts';
import { MacAppIcon } from './MacAppIcon.tsx';
import { Copy, Check, Download, Eye, Sparkles, Layers, Sliders, Smartphone, Apple } from 'lucide-react';

interface MacIconGalleryProps {
  onSelectApp?: (app: MacAppItem) => void;
}

export const MacIconGallery: React.FC<MacIconGalleryProps> = ({ onSelectApp }) => {
  const [selectedApp, setSelectedApp] = useState<MacAppItem>(MAC_OS_APPS[0]);
  const [iconSize, setIconSize] = useState<number>(96);
  const [canvasBg, setCanvasBg] = useState<'dark' | 'light' | 'sonoma'>('dark');
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'System Core', 'Perception & UI', 'Developer & Hardware', 'Daily Apps'];

  const filteredApps = categoryFilter === 'All'
    ? MAC_OS_APPS
    : MAC_OS_APPS.filter((a) => a.category === categoryFilter);

  const handleCopySvg = () => {
    const dummySvg = `<svg viewBox="0 0 128 128" width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <!-- AetherOS macOS Squircle App Icon: ${selectedApp.name} (${selectedApp.bundleId}) -->
  <!-- Curvature: 22.37% continuous corner radius -->
  <rect width="128" height="128" rx="28.6" fill="${selectedApp.palette.bgFrom}" />
</svg>`;
    navigator.clipboard.writeText(dummySvg);
    setCopiedSvg(true);
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Gallery Header */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              macOS App Icon Suite & Companion Studio
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                macOS Sonoma / Sequoia HIG
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Identical macOS squircle app icons (continuous curvature, specular rim light, multi-layer 3D depth)
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3">
          {/* Canvas Background Selector */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-mono">
            <button
              onClick={() => setCanvasBg('dark')}
              className={`px-2.5 py-1 rounded-lg transition ${
                canvasBg === 'dark' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Dock
            </button>
            <button
              onClick={() => setCanvasBg('light')}
              className={`px-2.5 py-1 rounded-lg transition ${
                canvasBg === 'light' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Light Desk
            </button>
            <button
              onClick={() => setCanvasBg('sonoma')}
              className={`px-2.5 py-1 rounded-lg transition ${
                canvasBg === 'sonoma'
                  ? 'bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sonoma Sky
            </button>
          </div>

          {/* Size Range Slider */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono text-slate-300">
            <span>Size:</span>
            <input
              type="range"
              min="48"
              max="144"
              step="16"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-20 accent-pink-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
            />
            <span className="w-8 text-right text-pink-400">{iconSize}px</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 font-mono text-[11px] mr-2">Filter Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              categoryFilter === cat
                ? 'bg-pink-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Launchpad Grid & Selected Icon Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Launchpad Grid (8 cols) */}
        <div
          className={`lg:col-span-8 p-6 flex flex-col justify-between transition-colors duration-300 ${
            canvasBg === 'dark'
              ? 'bg-slate-950'
              : canvasBg === 'light'
              ? 'bg-slate-100'
              : 'bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950'
          }`}
        >
          {/* App Icons Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-6 items-center justify-items-center py-4">
            {filteredApps.map((app) => {
              const isSelected = selectedApp.id === app.id;

              return (
                <div
                  key={app.id}
                  onClick={() => {
                    setSelectedApp(app);
                    if (onSelectApp) onSelectApp(app);
                  }}
                  className={`group flex flex-col items-center cursor-pointer p-2 rounded-2xl transition-all duration-200 ${
                    isSelected ? 'bg-white/10 ring-2 ring-pink-500 shadow-xl' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="transform group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-200">
                    <MacAppIcon type={app.iconType} size={iconSize} />
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium text-center truncate max-w-[110px] ${
                      canvasBg === 'light' ? 'text-slate-900 font-semibold' : 'text-slate-200'
                    }`}
                  >
                    {app.name}
                  </span>
                  <span
                    className={`text-[10px] text-center truncate max-w-[95px] ${
                      canvasBg === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {app.badge}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Design Specs Callout */}
          <div
            className={`mt-4 p-3 rounded-xl border text-xs flex items-center justify-between font-mono ${
              canvasBg === 'light'
                ? 'bg-white border-slate-300 text-slate-700'
                : 'bg-slate-900/80 border-slate-800 text-slate-400'
            }`}
          >
            <span>macOS Superellipse: 22.37% Radius</span>
            <span>Specular Highlight: Inset 1px White</span>
            <span>Shadow: Dual-Layer Diffuse</span>
          </div>
        </div>

        {/* Selected Icon Inspector (4 cols) */}
        <div className="lg:col-span-4 border-l border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Icon Spec Inspector
              </span>
              <span className="text-xs font-mono text-pink-400 font-bold">{selectedApp.badge}</span>
            </div>

            {/* High-res 128px Preview */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <MacAppIcon type={selectedApp.iconType} size={128} />
              <h4 className="text-base font-bold text-white mt-4">{selectedApp.name}</h4>
              <span className="text-xs font-mono text-slate-400">{selectedApp.bundleId}</span>
            </div>

            {/* Geometry Attributes */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Geometry:</span>
                <span>Squircle (r=28.6/128)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Accent:</span>
                <span style={{ color: selectedApp.palette.accent }} className="font-bold">
                  {selectedApp.palette.accent}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Target OS:</span>
                <span>macOS 14+ / AetherOS</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">Category:</span>
                <span>{selectedApp.category}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              {selectedApp.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={() => {
                if (onSelectApp) onSelectApp(selectedApp);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold transition shadow flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Launch Companion App Window
            </button>
            <button
              onClick={handleCopySvg}
              className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition border border-slate-700 flex items-center justify-center gap-2"
            >
              {copiedSvg ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedSvg ? 'SVG Copied to Clipboard!' : 'Copy macOS Icon SVG'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
