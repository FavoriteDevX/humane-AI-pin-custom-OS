import React, { useState } from 'react';
import { LaserProjectorSimulator } from './components/LaserProjectorSimulator.tsx';
import { RepoTreeView } from './components/RepoTreeView.tsx';
import { ReadmeViewer } from './components/ReadmeViewer.tsx';
import { MacIconGallery } from './components/MacIconGallery.tsx';
import { BuildTerminalSimulator } from './components/BuildTerminalSimulator.tsx';
import { MacOsAppWindow } from './components/MacOsAppWindow.tsx';
import { MacOsDock } from './components/MacOsDock.tsx';
import { MAC_OS_APPS, MacAppItem } from './data/macOsAppsData.ts';
import {
  Sparkles,
  Layers,
  FileCode,
  BookOpen,
  Terminal,
  Cpu,
  ShieldCheck,
  Zap,
  FolderTree,
  ExternalLink,
  Laptop,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projector' | 'repo' | 'readme' | 'mac_icons' | 'build'>('overview');
  const [activeApp, setActiveApp] = useState<MacAppItem | null>(MAC_OS_APPS[0]);
  const [showAppWindow, setShowAppWindow] = useState<boolean>(false);

  const handleSelectApp = (app: MacAppItem) => {
    setActiveApp(app);
    setShowAppWindow(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Embedded OS Engineering Header */}
      <header className="sticky top-0 z-50 bg-slate-900/85 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Hardware Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">AetherOS</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-bold">
                  v1.0.0-aosp14
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  Humane AI Pin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Open-Source AI-First Embedded OS • Qualcomm Snapdragon arm64
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('projector')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'projector'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Palm Projector
            </button>
            <button
              onClick={() => setActiveTab('repo')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'repo'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FolderTree className="w-3.5 h-3.5 text-cyan-400" />
              Repo Tree & Code
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              README.md
            </button>
            <button
              onClick={() => setActiveTab('mac_icons')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'mac_icons'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Laptop className="w-3.5 h-3.5 text-pink-400" />
              macOS Apps
            </button>
            <button
              onClick={() => setActiveTab('build')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'build'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-yellow-400" />
              build_os.sh
            </button>
          </nav>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('mac_icons');
                setShowAppWindow(true);
              }}
              className="px-3 py-1.5 rounded-xl bg-pink-500/15 border border-pink-500/30 hover:bg-pink-500/25 text-pink-300 text-xs font-mono font-medium transition flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5" />
              Launch Companion
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto px-4 py-2 border-t border-slate-800 gap-1 bg-slate-950 text-xs font-mono">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'overview' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projector')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'projector' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            Palm Projector
          </button>
          <button
            onClick={() => setActiveTab('repo')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'repo' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            Repo Tree
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'readme' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            README.md
          </button>
          <button
            onClick={() => setActiveTab('mac_icons')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'mac_icons' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            macOS Apps
          </button>
          <button
            onClick={() => setActiveTab('build')}
            className={`px-2.5 py-1 rounded whitespace-nowrap ${activeTab === 'build' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
          >
            build_os.sh
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-8 pb-32 space-y-8">
        {/* Floating Active macOS Companion Window (if opened) */}
        {showAppWindow && activeApp && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2 px-1">
              <span>ACTIVE MACOS COMPANION APP</span>
              <button
                onClick={() => setShowAppWindow(false)}
                className="text-pink-400 hover:text-pink-300 hover:underline"
              >
                Hide Window
              </button>
            </div>
            <MacOsAppWindow app={activeApp} onClose={() => setShowAppWindow(false)} />
          </div>
        )}

        {/* Tab 1: Project Overview & Architecture Hero */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
              <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  Principal Embedded OS Engineering Architecture
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  AetherOS for Humane AI Pin
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  An open-source, AI-first operating system designed to revive and elevate the Humane AI Pin hardware. Built on a stripped-down, headless <strong>AOSP 14 minimal base</strong>, AetherOS replaces smartphone overhead with an ultra-responsive native AI orchestrator daemon, direct-diode 720p MEMS laser projection rasterizer, and a full macOS companion workstation.
                </p>

                {/* Hardware Spec Quick Chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Qualcomm Snapdragon (arm64-v8a)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" /> 720x720 MEMS Laser Display
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> IEC 60825-1 Class 2 Safe
                  </span>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <button
                    onClick={() => setActiveTab('projector')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs font-mono transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    Open Laser Palm Simulator
                  </button>
                  <button
                    onClick={() => setActiveTab('repo')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs font-mono border border-slate-700 transition flex items-center gap-2"
                  >
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    Explore Source Code & Tree
                  </button>
                  <button
                    onClick={() => setActiveTab('mac_icons')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs font-mono border border-slate-700 transition flex items-center gap-2"
                  >
                    <Laptop className="w-4 h-4 text-pink-400" />
                    macOS App Icon Suite
                  </button>
                </div>
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => setActiveTab('projector')}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Laser Projection Subsystem</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct-diode 520nm green & amber MEMS scanline compositor in C++ (/ui-projector). Integrates automatic trapezoidal keystone correction and sub-millimeter palm distance interlock.
                </p>
                <div className="mt-4 text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                  Test Palm Simulator →
                </div>
              </div>

              <div
                onClick={() => setActiveTab('repo')}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">Native AI Orchestrator</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  C++ native system daemon (/aether-core). Hooks /dev/input/event0 for capacitive touchpad triggers, TinyALSA stereo beamforming mic capture, and Gemini 2.5 streaming dispatch.
                </p>
                <div className="mt-4 text-xs font-mono text-cyan-400 flex items-center gap-1 font-semibold">
                  View Orchestrator Source →
                </div>
              </div>

              <div
                onClick={() => setActiveTab('mac_icons')}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 transition cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                  <Laptop className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">macOS App Icon Suite</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Identical macOS squircle app icons styled after Apple HIG (Sonoma & Sequoia). Includes Aether Studio, Laser Mirror, EDL Unbrick, and desktop companion tools.
                </p>
                <div className="mt-4 text-xs font-mono text-pink-400 flex items-center gap-1 font-semibold">
                  Explore macOS Apps & Icons →
                </div>
              </div>
            </div>

            {/* Quick Preview of the Virtual Palm Simulator */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono">
                  Interactive Subsystem Preview
                </h3>
                <span className="text-xs text-slate-500 font-mono">Click tab above for full controls</span>
              </div>
              <LaserProjectorSimulator />
            </div>
          </div>
        )}

        {/* Tab 2: Laser Projector Simulator */}
        {activeTab === 'projector' && (
          <div className="space-y-6">
            <LaserProjectorSimulator />
          </div>
        )}

        {/* Tab 3: Repo Tree & Full Source Code */}
        {activeTab === 'repo' && (
          <div className="space-y-6">
            <RepoTreeView />
          </div>
        )}

        {/* Tab 4: Official README.md Documentation */}
        {activeTab === 'readme' && (
          <div className="space-y-6">
            <ReadmeViewer />
          </div>
        )}

        {/* Tab 5: macOS Companion Apps & App Icons */}
        {activeTab === 'mac_icons' && (
          <div className="space-y-6">
            <MacIconGallery onSelectApp={handleSelectApp} />
          </div>
        )}

        {/* Tab 6: build_os.sh Compilation Terminal */}
        {activeTab === 'build' && (
          <div className="space-y-6">
            <BuildTerminalSimulator />
          </div>
        )}
      </main>

      {/* Floating Interactive macOS Dock at Screen Bottom */}
      <footer className="sticky bottom-0 z-40 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent pt-4 pb-2">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
          <MacOsDock
            activeAppId={activeApp ? activeApp.id : ''}
            onSelectApp={handleSelectApp}
          />
          <div className="text-[10px] font-mono text-slate-500 mt-1 flex items-center gap-3">
            <span>AetherOS Community Project</span>
            <span>•</span>
            <span>Humane AI Pin Hardware Target</span>
            <span>•</span>
            <span>macOS Sonoma / Sequoia Companion Suite</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
