/**
 * macOS Companion Apps and AetherOS Core App Icons
 * Styled with macOS Sonoma/Sequoia HIG continuous squircle geometry,
 * multi-layer depth, specular lighting, and authentic Cupertino gradients.
 */

export interface MacAppItem {
  id: string;
  name: string;
  badge?: string;
  category: 'System Core' | 'Perception & UI' | 'Developer & Hardware' | 'Daily Apps';
  description: string;
  version: string;
  bundleId: string;
  palette: {
    bgFrom: string;
    bgTo: string;
    accent: string;
    border: string;
  };
  features: string[];
  iconType: 'aether_core' | 'laser_projector' | 'palm_gestures' | 'acoustic_mic' | 'vision_camera' | 'battery_booster' | 'aether_studio' | 'edl_recovery' | 'laser_notes' | 'beacon_led' | 'weather_palm' | 'shortcuts_bus';
}

export const MAC_OS_APPS: MacAppItem[] = [
  {
    id: 'aether-core',
    name: 'Aether Core',
    badge: 'AI Engine',
    category: 'System Core',
    description: 'The native AI orchestrator daemon. Routes voice, touchpad, and optical gestures into Gemini 2.5 Flash and on-device Qualcomm Hexagon SLM inference.',
    version: '1.4.2',
    bundleId: 'org.aetheros.daemon.core',
    palette: {
      bgFrom: '#1e0845',
      bgTo: '#0b021c',
      accent: '#a855f7',
      border: 'rgba(168,85,247,0.3)',
    },
    features: [
      'Touchpad hold / tap dispatch via /dev/input/event0',
      'Continuous streaming to Gemini 2.5 Flash API',
      'Local tool bus (timer, calendar, camera, weather)',
      'Qualcomm Hexagon NPU QNN execution runtime',
    ],
    iconType: 'aether_core',
  },
  {
    id: 'laser-projector',
    name: 'Laser Projector',
    badge: 'MEMS 720p',
    category: 'Perception & UI',
    description: 'Direct-diode MEMS laser scanning controller and 1-bit scanline compositor. Rasters high-contrast green/amber HUD on user palms.',
    version: '2.1.0',
    bundleId: 'org.aetheros.ui.projector',
    palette: {
      bgFrom: '#002814',
      bgTo: '#000f07',
      accent: '#00ff66',
      border: 'rgba(0,255,102,0.35)',
    },
    features: [
      '720x720 monochrome laser scanline pipeline @ 60Hz',
      'Trapezoidal palm curvature keystone compensation',
      'IEC 60825-1 Class 2 optical distance interlock',
      'Ambient light sensor dynamic brightness scaling',
    ],
    iconType: 'laser_projector',
  },
  {
    id: 'palm-gestures',
    name: 'Palm Gestures',
    badge: 'ToF Vision',
    category: 'Perception & UI',
    description: 'Time-of-Flight depth and optical hand tracking pipeline. Decodes pinch-to-select, palm roll tilt, and distance telemetry.',
    version: '1.2.0',
    bundleId: 'org.aetheros.hal.gestures',
    palette: {
      bgFrom: '#002f4b',
      bgTo: '#001322',
      accent: '#00d2ff',
      border: 'rgba(0,210,255,0.35)',
    },
    features: [
      'Sub-millimeter hand distance tracking (80mm - 450mm)',
      'Pinch gesture state machine (index + thumb)',
      'Palm roll tilt angle mapping (-30° to +30°)',
      'Safety cutoff if eye or face approaches beam',
    ],
    iconType: 'palm_gestures',
  },
  {
    id: 'acoustic-ear',
    name: 'Acoustic Ear',
    badge: 'Audio DSP',
    category: 'System Core',
    description: 'Low-latency dual-mic TinyALSA capture streamer with Qualcomm Fluence beamforming and low-power wake-word detection.',
    version: '1.0.8',
    bundleId: 'org.aetheros.audio.daemon',
    palette: {
      bgFrom: '#3b0730',
      bgTo: '#170012',
      accent: '#ec4899',
      border: 'rgba(236,72,153,0.35)',
    },
    features: [
      '48kHz 24-bit stereo PCM capture pipeline',
      'Spatial beamformer suppressing ambient wind/traffic',
      'Hardware DSP low-power keyword listener',
      'Haptic audio feedback chime generator',
    ],
    iconType: 'acoustic_mic',
  },
  {
    id: 'vision-camera',
    name: 'Aether Vision',
    badge: '13MP RGB',
    category: 'Perception & UI',
    description: 'Ultra-wide RGB camera driver and multimodal perception pipeline for food nutrition, scene recognition, and OCR.',
    version: '2.0.1',
    bundleId: 'org.aetheros.vision.multimodal',
    palette: {
      bgFrom: '#1c1c1e',
      bgTo: '#000000',
      accent: '#38bdf8',
      border: 'rgba(255,255,255,0.2)',
    },
    features: [
      'Ultra-wide 13MP sensor snapshot pipeline',
      'Zero-shutter-lag instant frame buffering',
      'Gemini 2.5 Flash Multimodal image description',
      'Privacy LED hardware interlock indicator',
    ],
    iconType: 'vision_camera',
  },
  {
    id: 'battery-booster',
    name: 'Battery & Booster',
    badge: 'Power HAL',
    category: 'Developer & Hardware',
    description: 'Smart power balancer managing the internal Li-ion battery and hot-swappable magnetic Battery Booster clip.',
    version: '1.3.4',
    bundleId: 'org.aetheros.power.booster',
    palette: {
      bgFrom: '#2e1800',
      bgTo: '#120900',
      accent: '#f59e0b',
      border: 'rgba(245,158,11,0.35)',
    },
    features: [
      'Pogo-pin magnetic dock telemetry & handshake',
      'Continuous skin-contact temperature monitoring (<43°C)',
      'Hot-swap battery failover without OS reboot',
      'Predictive runtime estimation based on laser duty cycle',
    ],
    iconType: 'battery_booster',
  },
  {
    id: 'aether-studio',
    name: 'Aether Studio',
    badge: 'macOS IDE',
    category: 'Developer & Hardware',
    description: 'Comprehensive macOS developer workstation: ADB logcat, AOSP image flasher, laser display mirror, and QNN model compiler.',
    version: '3.0.0',
    bundleId: 'org.aetheros.tools.studio',
    palette: {
      bgFrom: '#111827',
      bgTo: '#030712',
      accent: '#6366f1',
      border: 'rgba(99,102,241,0.4)',
    },
    features: [
      'One-click Fastboot & Super partition flashing',
      'Live TCP/USB laser projection mirror stream',
      'Qualcomm Hexagon NPU INT8 quantization studio',
      'Interactive SElinux & dmesg kernel trace inspector',
    ],
    iconType: 'aether_studio',
  },
  {
    id: 'edl-recovery',
    name: 'EDL Unbrick',
    badge: 'Qualcomm 9008',
    category: 'Developer & Hardware',
    description: 'Emergency unbricking utility communicating over Qualcomm Sahara and Firehose protocols to rescue hard-bricked AI Pins.',
    version: '1.1.2',
    bundleId: 'org.aetheros.tools.edl',
    palette: {
      bgFrom: '#3f0606',
      bgTo: '#170000',
      accent: '#ef4444',
      border: 'rgba(239,68,68,0.4)',
    },
    features: [
      'Automatic USB Qualcomm 9008 device handshake',
      'Direct raw flash writes via Firehose XML programmer',
      'Partition table (GPT) restoration',
      'Fuse inspection and bootloader unlock helper',
    ],
    iconType: 'edl_recovery',
  },
  {
    id: 'laser-notes',
    name: 'Palm Memos',
    badge: 'Quick Notes',
    category: 'Daily Apps',
    description: 'Instant voice-transcribed memos and reminders projected in high-contrast bulleted laser scanlines.',
    version: '1.0.2',
    bundleId: 'org.aetheros.apps.notes',
    palette: {
      bgFrom: '#fffbeb',
      bgTo: '#fef3c7',
      accent: '#d97706',
      border: 'rgba(217,119,6,0.25)',
    },
    features: [
      'Voice-to-laser instant dictation',
      'Checklist navigation via palm roll and pinch',
      'End-to-end encrypted sync to Mac / Cloud',
      'Offline on-device sqlite caching',
    ],
    iconType: 'laser_notes',
  },
  {
    id: 'beacon-led',
    name: 'Beacon Light',
    badge: 'RGB Trust',
    category: 'Daily Apps',
    description: 'Trust and privacy indicator controller: Green (Mic/Camera Active), Yellow (Notification), White (Pairing/Fastboot).',
    version: '1.0.0',
    bundleId: 'org.aetheros.sys.beacon',
    palette: {
      bgFrom: '#042f2e',
      bgTo: '#011414',
      accent: '#14b8a6',
      border: 'rgba(20,184,166,0.3)',
    },
    features: [
      'Hardwired trust LED privacy compliance',
      'Custom color pulses for VIP notifications',
      'Breathing charging indicator during dock',
      'Emergency SOS strobe pattern mode',
    ],
    iconType: 'beacon_led',
  },
  {
    id: 'weather-palm',
    name: 'Aether Weather',
    badge: 'Atmosphere',
    category: 'Daily Apps',
    description: 'Minimalist laser atmospheric radar with hourly temperature arcs, precipitation probability, and wind metrics.',
    version: '1.1.0',
    bundleId: 'org.aetheros.apps.weather',
    palette: {
      bgFrom: '#0284c7',
      bgTo: '#0369a1',
      accent: '#38bdf8',
      border: 'rgba(56,189,248,0.35)',
    },
    features: [
      'Micro-climate hyper-local forecast',
      'Palm-arc temperature timeline',
      'Rain alert haptic vibration',
      'UV and solar index safety check',
    ],
    iconType: 'weather_palm',
  },
  {
    id: 'shortcuts-bus',
    name: 'Aether Flows',
    badge: 'Automation',
    category: 'Daily Apps',
    description: 'Node-based local automation graph connecting physical gestures, voice triggers, smart home devices, and webhooks.',
    version: '1.2.5',
    bundleId: 'org.aetheros.apps.shortcuts',
    palette: {
      bgFrom: '#311042',
      bgTo: '#160421',
      accent: '#c084fc',
      border: 'rgba(192,132,252,0.35)',
    },
    features: [
      'Trigger actions on double-tap or tilt',
      'Home Assistant / Matter integration',
      'Custom webhook triggers for web services',
      'Export and share flows via QR or NFC',
    ],
    iconType: 'shortcuts_bus',
  },
];
