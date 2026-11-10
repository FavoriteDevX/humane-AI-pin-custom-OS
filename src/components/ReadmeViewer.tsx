import React, { useState } from 'react';
import { README_CONTENT } from '../data/aetherRepoData.ts';
import { BookOpen, Copy, Check, Download, ShieldAlert, Cpu, Layers, Terminal } from 'lucide-react';

export const ReadmeViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'formatted' | 'raw'>('formatted');

  const handleCopy = () => {
    navigator.clipboard.writeText(README_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([README_CONTENT], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              README.md Documentation
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Official Engineering Manual
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Architecture specs, kernel configuration, IEC 60825-1 laser interlock, and build manual
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('formatted')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'formatted' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Rich Formatted
            </button>
            <button
              onClick={() => setActiveTab('raw')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'raw' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Raw Markdown (.md)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy README.md'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono transition shadow"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'formatted' ? (
        <div className="p-8 text-slate-300 space-y-6 max-h-[750px] overflow-y-auto leading-relaxed select-text font-sans">
          {/* Hero Badges */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-800">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/40">
              BUILD: PASSING
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 text-xs font-mono border border-blue-500/40">
              TARGET: HUMANE AI PIN (B1)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 text-xs font-mono border border-orange-500/40">
              BASE: AOSP 14 (MINIMAL)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-mono border border-purple-500/40">
              SOC: QUALCOMM SNAPDRAGON (ARM64)
            </span>
            <span className="px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 text-xs font-mono border border-red-500/40">
              LASER SAFETY: IEC 60825-1 CLASS 2
            </span>
          </div>

          {/* Section: Overview */}
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              AetherOS for Humane AI Pin
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              <strong>AetherOS</strong> is an open-source, AI-first, screenless operating system engineered specifically for the <strong>Humane AI Pin</strong> hardware platform. Built on top of a streamlined, stripped-down Android Open Source Project (AOSP 14) base, AetherOS replaces conventional smartphone abstractions with a deterministic native AI orchestration loop, low-power optical gesture pipelines, and a direct-diode 720p MEMS laser projection rasterizer.
            </p>
          </div>

          {/* Section: Architecture ASCII Flow */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Layered System Architecture Flow
            </h3>
            <pre className="text-xs font-mono text-purple-200 overflow-x-auto leading-tight p-2 bg-black/40 rounded-lg">
{`+--------------------------------------------------------------------------+
|                            USER PALM / SENSES                            |
|             (Monochrome 720p Laser Projection | Voice | Gestures)        |
+--------------------------------------------------------------------------+
                                     ^
                                     |
+------------------------------------+-------------------------------------+
|                      /aether-core (Native AI Daemon)                     |
|   - Touchpad Input Dispatcher (/dev/input/event0)                        |
|   - TinyALSA Dual-Mic Beamforming Capture                                |
|   - Streaming HTTPS LLM Engine (Gemini API & On-Device QNN SLM)          |
|   - Intent Router & Local Tool Execution Bus                             |
+------------------------------------+-------------------------------------+
                                     ^
                                     |  Gralloc / HIDL / HAL APIs
+------------------------------------+-------------------------------------+
|                 /ui-projector (Laser Interface Layer)                    |
|   - 1-Bit Scanline Monochrome Rasterizer (720x720 @ 60Hz)                |
|   - Palm Curvature & Keystone Warp Engine                                |
|   - Optical Distance Safety Interlock Watchdog (80mm - 450mm)            |
+------------------------------------+-------------------------------------+
                                     ^
                                     |
+------------------------------------+-------------------------------------+
|                /device/humane/aipin (Hardware & HAL Layer)               |
|   - Laser Projector HAL (MEMS Scanning Mirror & Diode Driver)            |
|   - Time-of-Flight (ToF) Hand & Distance Tracking HAL                   |
|   - Magnetic Battery Booster Dock & Thermal Balance HAL                  |
+------------------------------------+-------------------------------------+
                                     ^
                                     |
+------------------------------------+-------------------------------------+
|             MINIMAL AOSP KERNEL & QUALCOMM SNAPDRAGON BASE               |
|   - Linux Kernel 5.4 (arm64-v8a) with AI Pin DTS                         |
|   - Hexagon NPU / DSP Voice Frontend Firmware Blobs                      |
|   - Qualcomm TrustZone (TEE) & AVB 2.0 Boot Guard                        |
+--------------------------------------------------------------------------+`}
            </pre>
          </div>

          {/* Section: Hardware Specs Table */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Hardware Specifications & Subsystem Drivers
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4">Subsystem</th>
                    <th className="py-2.5 px-4">Hardware Specification</th>
                    <th className="py-2.5 px-4">AetherOS Driver & Path</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Processor</td>
                    <td className="py-2.5 px-4">Qualcomm Snapdragon (8x Kryo arm64-v8a)</td>
                    <td className="py-2.5 px-4 text-cyan-400">core_64_bit_only.mk</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">NPU / DSP</td>
                    <td className="py-2.5 px-4">Qualcomm Hexagon DSP + QNN Accelerator</td>
                    <td className="py-2.5 px-4 text-cyan-400">/aether-core/ai/ondevice_qnn_runner.cpp</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Laser Display</td>
                    <td className="py-2.5 px-4">720x720 MEMS Laser Projection (520nm Green)</td>
                    <td className="py-2.5 px-4 text-cyan-400">/ui-projector/projector_interface.cpp</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Perception</td>
                    <td className="py-2.5 px-4">13MP Ultra-Wide RGB + ToF Depth Sensor</td>
                    <td className="py-2.5 px-4 text-cyan-400">/device/humane/aipin/hal/optical_tracker/</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Touch Input</td>
                    <td className="py-2.5 px-4">Capacitive Multi-touch Surface</td>
                    <td className="py-2.5 px-4 text-cyan-400">Linux input /dev/input/event0</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-white">Battery Booster</td>
                    <td className="py-2.5 px-4">Magnetic Hot-Swap Booster Dock Pins</td>
                    <td className="py-2.5 px-4 text-cyan-400">/device/humane/aipin/hal/power_booster/</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section: Laser Safety Box */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200">
            <h4 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Laser Optical Safety Guardrails (IEC 60825-1)
            </h4>
            <ul className="text-xs space-y-1.5 mt-2 list-disc list-inside">
              <li><strong>Optical Distance Interlock:</strong> Time-of-Flight sensor shuts off laser beam if palm is closer than 80mm or further than 450mm.</li>
              <li><strong>Thermal Skin Contact Limit:</strong> Under IEC 62368-1, wearable devices must remain under 43.0°C against human skin.</li>
              <li><strong>Continuous Duty Cutoff:</strong> Hard hardware timeout after 30 seconds of continuous laser projection.</li>
            </ul>
          </div>

          {/* Section: Build Commands */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              Quick Compilation & Flashing Guide
            </h3>
            <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto">
{`# 1. Initialize environment & lunch target
source build/envsetup.sh
lunch aether_aipin-userdebug

# 2. Compile system images with all host cores
m umbrella-image -j$(nproc)

# 3. Flash to Humane AI Pin via fastboot
fastboot flash boot    out/target/product/aipin/boot.img
fastboot flash dtbo    out/target/product/aipin/dtbo.img
fastboot flash vbmeta  out/target/product/aipin/vbmeta.img
fastboot flash super   out/target/product/aipin/super.img
fastboot erase userdata && fastboot reboot`}
            </pre>
          </div>

          {/* Section: Community Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
            <h4 className="font-bold text-white">Community & Experimental Notice</h4>
            <p>
              AetherOS is an independent open-source operating system project developed by community engineers. It is not affiliated with, sponsored by, or endorsed by Humane Inc. Flashing custom firmware voids factory warranties. Modifying laser power tables or disabling optical safety interlocks is strictly prohibited.
            </p>
          </div>
        </div>
      ) : (
        /* Raw Markdown View */
        <div className="p-4 bg-slate-950">
          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-200 overflow-x-auto leading-relaxed max-h-[750px] select-text">
            {README_CONTENT}
          </pre>
        </div>
      )}
    </div>
  );
};
