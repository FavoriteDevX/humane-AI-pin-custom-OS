import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, AlertTriangle, RefreshCw, HardDrive, Cpu, ShieldCheck } from 'lucide-react';

export const BuildTerminalSimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [buildFinished, setBuildFinished] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    '$ ./build_os.sh',
    'Ready to build AetherOS for Humane AI Pin (aether_aipin-userdebug)',
    'Press "Run Compilation Pipeline" below to execute...',
  ]);

  const runBuild = () => {
    setIsRunning(true);
    setBuildFinished(false);
    setCurrentStep(1);
    setLogs([
      '$ ./build_os.sh',
      '========================================================================',
      '             AETHEROS - EMBEDDED SYSTEM BUILD PIPELINE                  ',
      '        Open-Source AI-First OS for Humane AI Pin (AOSP 14 Base)       ',
      '========================================================================',
      '',
      '[Step 1/4] Verifying Host Environment & Build Dependencies...',
      'Checking toolchain: repo (OK), git (OK), python3 (OK), clang 17.0 (OK)',
      'Checking build utilities: flex, bison, zip, unzip, fastboot (OK)',
      '[OK] Host environment ready.',
    ]);

    setTimeout(() => {
      setCurrentStep(2);
      setLogs((prev) => [
        ...prev,
        '',
        '[Step 2/4] Initializing AOSP Build Environment...',
        'Sourcing build/envsetup.sh...',
        'Invoking lunch: aether_aipin-userdebug',
        'PLATFORM_VERSION_CODENAME=UpsideDownCake',
        'PLATFORM_VERSION=14',
        'TARGET_PRODUCT=aether_aipin',
        'TARGET_BUILD_VARIANT=userdebug',
        'TARGET_ARCH=arm64 (arm64-v8a Cortex-A73)',
        'TARGET_BOARD_PLATFORM=sdm720',
        '[OK] Environment configured.',
      ]);
    }, 1100);

    setTimeout(() => {
      setCurrentStep(3);
      setLogs((prev) => [
        ...prev,
        '',
        '[Step 3/4] Compiling AetherOS Core, Projector HAL, and Kernel...',
        'Spawning 16 parallel ninja workers: m umbrella-image -j16',
        '[ 12% 1420/11830] CC device/humane/aipin/hal/laser_display/laser_projector_hal.cpp',
        '[ 28% 3312/11830] CC ui-projector/projector_interface.cpp',
        '[ 45% 5323/11830] CC aether-core/aether_orchestrator.cpp',
        '[ 67% 7926/11830] AIDL frameworks/base/core/java/android/os/ILaserWindowManager.aidl',
        '[ 84% 9937/11830] Building Linux Kernel 5.4.210-qgki-aipin Image.gz-dtb...',
        '[ 96% 11356/11830] Assembling dynamic super partition (system + vendor + aether_core)...',
        '[100% 11830/11830] Signing AVB 2.0 vbmeta.img with test keys...',
        '[SUCCESS] Compilation finished in 4.2s (cached ninja).',
      ]);
    }, 2400);

    setTimeout(() => {
      setCurrentStep(4);
      setLogs((prev) => [
        ...prev,
        '',
        '========================================================================',
        '                    BUILD SUMMARY & FLASH INSTRUCTIONS                 ',
        '========================================================================',
        'Target Product  : aether_aipin-userdebug',
        'Output Directory: out/target/product/aipin',
        'Flashable Images:',
        '  - out/target/product/aipin/boot.img           (64 MB  - Linux Kernel 5.4 + ramdisk)',
        '  - out/target/product/aipin/dtbo.img           (8 MB   - Humane AI Pin Device Tree Overlays)',
        '  - out/target/product/aipin/super.img          (1.8 GB - System + Vendor + Aether Core)',
        '  - out/target/product/aipin/vbmeta.img         (64 KB  - Verified Boot 2.0 metadata)',
        '  - out/target/product/aipin/aether_core.img    (28 MB  - AI Orchestrator & Projector Daemons)',
        '',
        'To flash to your Humane AI Pin hardware:',
        '  1. Place device into Fastboot mode (Hold Touchpad while docking into Charger)',
        '  2. Run fastboot flash commands:',
        '     fastboot flash boot    out/target/product/aipin/boot.img',
        '     fastboot flash dtbo    out/target/product/aipin/dtbo.img',
        '     fastboot flash vbmeta  out/target/product/aipin/vbmeta.img',
        '     fastboot flash super   out/target/product/aipin/super.img',
        '     fastboot erase userdata',
        '     fastboot reboot',
        '========================================================================',
      ]);
      setIsRunning(false);
      setBuildFinished(true);
    }, 3800);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              build_os.sh Compilation Terminal
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                AOSP Soong & Ninja
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive execution of root build_os.sh script generating fastboot partition images
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          disabled={isRunning}
          onClick={runBuild}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition shadow ${
            isRunning
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 hover:shadow-emerald-500/20'
          }`}
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              Compiling AetherOS...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              Run Compilation Pipeline (build_os.sh)
            </>
          )}
        </button>
      </div>

      {/* Progress Pipeline Stepper */}
      <div className="px-6 py-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] border-current">1</span>
          <span>Host Tools Check</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] border-current">2</span>
          <span>AOSP Lunch Env</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] border-current">3</span>
          <span>Ninja Parallel Build</span>
        </div>
        <span className="text-slate-600">→</span>
        <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
          <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px] border-current">4</span>
          <span>Fastboot Packager</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 bg-slate-950 font-mono text-xs leading-relaxed max-h-[500px] overflow-y-auto select-text">
        <div className="space-y-1">
          {logs.map((line, idx) => (
            <div
              key={idx}
              className={`${
                line.startsWith('[SUCCESS]') || line.includes('(OK)')
                  ? 'text-emerald-400 font-semibold'
                  : line.startsWith('[Step') || line.includes('===')
                  ? 'text-cyan-300 font-bold'
                  : line.includes('fastboot flash')
                  ? 'text-yellow-300'
                  : line.startsWith('$')
                  ? 'text-purple-400 font-bold'
                  : 'text-slate-300'
              }`}
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Generated Images Footer Cards */}
      {buildFinished && (
        <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Target Images Ready in out/target/product/aipin/</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">boot.img (64M)</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">dtbo.img (8M)</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">super.img (1.8G)</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">vbmeta.img (64K)</span>
          </div>
        </div>
      )}
    </div>
  );
};
