import React, { useState } from 'react';
import { MacAppItem } from '../data/macOsAppsData.ts';
import { MacAppIcon } from './MacAppIcon.tsx';
import { Terminal, Download, Play, RefreshCw, Cpu, Layers, ShieldCheck, Zap, HardDrive, Smartphone, Usb } from 'lucide-react';

interface MacOsAppWindowProps {
  app: MacAppItem;
  onClose?: () => void;
}

export const MacOsAppWindow: React.FC<MacOsAppWindowProps> = ({ app, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactive' | 'spec'>('interactive');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    `[${app.name}] Initialized bundle: ${app.bundleId}`,
    `[Kernel] Probing Humane AI Pin USB endpoints (VID: 0x05c6, PID: 0x9008 / 0x4ee7)...`,
    `[Daemon] Secure channel established via libusb / ADB bridge.`,
  ]);
  const [actionInProgress, setActionInProgress] = useState<boolean>(false);

  const triggerAction = (actionName: string) => {
    setActionInProgress(true);
    setConsoleLogs((prev) => [...prev, `[Action] Starting ${actionName}...`]);
    setTimeout(() => {
      setConsoleLogs((prev) => [
        ...prev,
        `[Action] ${actionName} completed with status: 0 (SUCCESS)`,
        `[Telemetry] Device latency: 12ms | Link: USB 2.0 High-Speed (480Mbps)`,
      ]);
      setActionInProgress(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col min-h-[500px]">
      {/* macOS Window Title Bar */}
      <div className="h-11 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between px-4 select-none">
        {/* macOS Traffic Light Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center text-[8px] text-red-950 font-bold opacity-80 hover:opacity-100"
            title="Close Window"
          >
            ×
          </button>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        </div>

        {/* Window App Title & Icon */}
        <div className="flex items-center gap-2">
          <MacAppIcon type={app.iconType} size={20} showShadow={false} />
          <span className="text-xs font-semibold text-slate-200">
            {app.name} — <span className="text-slate-400 font-mono font-normal">{app.bundleId}</span>
          </span>
        </div>

        {/* Top Right Version Tag */}
        <span className="text-[11px] font-mono text-slate-400 bg-slate-700/40 px-2 py-0.5 rounded border border-slate-700">
          v{app.version}
        </span>
      </div>

      {/* App Subheader Toolbar */}
      <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <MacAppIcon type={app.iconType} size={54} />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{app.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
                {app.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 max-w-xl">{app.description}</p>
          </div>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'interactive' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Companion Tool
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Subsystem Features
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'spec' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            macOS Icon Spec
          </button>
        </div>
      </div>

      {/* Main Window Body */}
      <div className="p-6 flex-1 flex flex-col">
        {activeTab === 'interactive' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
            {/* Tool Action Controls (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-indigo-400" />
                Companion Actions
              </h4>

              {renderToolActions(app.id, triggerAction, actionInProgress)}

              {/* Connected Device Status Card */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mt-2">
                <div className="flex items-center justify-between text-xs text-slate-300 font-mono mb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AI Pin Hardware Attached
                  </span>
                  <span>USB 2.0 High-Speed</span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 space-y-1">
                  <div>Model: Humane AI Pin (B1 EVT/DVT)</div>
                  <div>SoC: Qualcomm Snapdragon 720G (8x Kryo)</div>
                  <div>Build: aether_aipin-userdebug 14.0</div>
                  <div>Laser Safety: IEC 60825-1 Certified</div>
                </div>
              </div>
            </div>

            {/* Live Terminal & Logs Output (7 cols) */}
            <div className="md:col-span-7 flex flex-col bg-slate-950 rounded-xl border border-slate-800 overflow-hidden min-h-[260px]">
              <div className="h-8 bg-slate-900 border-b border-slate-800 px-3 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  Live Daemon Log Stream
                </span>
                <button
                  onClick={() => setConsoleLogs([`[Console] Cleared logs.`])}
                  className="text-[10px] text-slate-500 hover:text-slate-300 font-mono"
                >
                  Clear
                </button>
              </div>
              <div className="p-3 font-mono text-xs text-slate-300 flex-1 overflow-y-auto space-y-1 select-text bg-black/60">
                {consoleLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('SUCCESS')
                        ? 'text-emerald-400'
                        : log.includes('Action')
                        ? 'text-indigo-400'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
                {actionInProgress && (
                  <div className="text-amber-400 animate-pulse flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Executing remote IPC transaction...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white">Subsystem Architectural Responsibilities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {app.features.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 text-xs font-mono">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <MacAppIcon type={app.iconType} size={128} />
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white">{app.name} macOS App Icon</h4>
                <p className="text-xs text-slate-400">
                  Constructed in compliance with Apple Human Interface Guidelines (macOS Sonoma / Sequoia). Features continuous curvature squircle mask, multi-layer depth, specular gradient rim lighting, and embedded tactile vector glyphs.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400 pt-1">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Format: SVG / ICNS</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Native Canvas: 512x512</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Corner Radius: 22.37%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function renderToolActions(
  appId: string,
  triggerAction: (name: string) => void,
  inProgress: boolean
) {
  switch (appId) {
    case 'aether-studio':
      return (
        <div className="space-y-2">
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Fastboot Super Partition Flash')}
            className="w-full py-2.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            Flash Super & Boot Partitions
          </button>
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Export Logcat & dmesg Trace')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            Dump Kernel & Logcat Trace
          </button>
        </div>
      );

    case 'laser-projector':
      return (
        <div className="space-y-2">
          <button
            disabled={inProgress}
            onClick={() => triggerAction('720p Scanline Raster Calibration')}
            className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            Run MEMS Optical Calibration
          </button>
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Toggle Night Amber Diode Mode')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Layers className="w-4 h-4" />
            Toggle Amber Phosphor Diode
          </button>
        </div>
      );

    case 'edl-recovery':
      return (
        <div className="space-y-2">
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Qualcomm Sahara 9008 Emergency Flash')}
            className="w-full py-2.5 px-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Usb className="w-4 h-4" />
            Send Firehose Programmer (Unbrick)
          </button>
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Restore GUID Partition Table (GPT)')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <HardDrive className="w-4 h-4" />
            Repair Primary GPT Block
          </button>
        </div>
      );

    default:
      return (
        <div className="space-y-2">
          <button
            disabled={inProgress}
            onClick={() => triggerAction('IPC Test Query')}
            className="w-full py-2.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-medium flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            Send Test IPC Dispatch
          </button>
          <button
            disabled={inProgress}
            onClick={() => triggerAction('Poll Telemetry')}
            className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Sensor Telemetry
          </button>
        </div>
      );
  }
}
