import type { IconName } from '../components/icons/types';

export const featureIcons: Record<string, IconName> = {
  'Aimbot & recoil': 'featureAimbot',
  'ESP / wallhack intel': 'featureEsp',
  'Radar & sound': 'featureRadar',
  'Trigger & auto-fire': 'triggerBot',
  'Misc movement': 'toolkitMovement',
  'Stream-safe layer': 'streamProof',
  'Cloud profiles': 'compareCloudBackup',
};

export const whyUsIcons: IconName[] = ['whyShield', 'whyUsers', 'whyMonitor', 'whyHeadphones'];

export const setupStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqCheck'];

export const toolkitIcons: Record<string, IconName> = {
  Combat: 'toolkitCombat',
  Vision: 'toolkitVision',
  Radar: 'toolkitRadar',
  Weapons: 'toolkitWeapons',
  Movement: 'toolkitMovement',
  Profiles: 'toolkitProfiles',
};

export const workflowIcons: IconName[] = [
  'workflowAlert',
  'workflowPackage',
  'workflowSettings',
  'workflowCheck',
];

export const fieldNoteIcons: IconName[] = ['fieldCalendar', 'fieldShield', 'fieldHeadphones'];

export const blogTagIcons: Record<string, IconName> = {
  Articles: 'navBlog',
  Setup: 'settings',
  Features: 'layers',
  Updates: 'refresh',
  Troubleshooting: 'alert',
  Faceit: 'shield',
};

export const heroStatusPills: { icon: IconName; label: string }[] = [
  { icon: 'espActive', label: 'ESP active' },
  { icon: 'radarOnline', label: 'Radar online' },
  { icon: 'seasonBuild', label: 'Patch build' },
  { icon: 'shieldCheck', label: 'Status checked' },
  { icon: 'softAim', label: 'Soft aim ready' },
  { icon: 'noRecoil', label: 'Recoil assist' },
  { icon: 'streamProof', label: 'Capture-aware' },
  { icon: 'skeletonEsp', label: 'Skeleton ESP' },
  { icon: 'support247', label: '24/7 support' },
  { icon: 'instantDelivery', label: 'Fast delivery' },
  { icon: 'triggerBot', label: 'Trigger assist' },
  { icon: 'boneSelect', label: 'Bone select' },
  { icon: 'liveStatus', label: 'Live status' },
  { icon: 'autoUpdates', label: 'Auto updates' },
];

export const heroStatIcons: IconName[] = [
  'heroStatStream',
  'heroStatClock',
  'heroStatUsers',
  'heroStatHeadphones',
];

export const cheatTierIcons: Record<string, IconName> = {
  CS2: 'crosshair',
  Lite: 'tierLite',
  Pro: 'tierPro',
  Elite: 'tierElite',
};

export const productCategoryIcons: Record<string, IconName> = {
  'Core product': 'coreProduct',
  'External suite': 'externalSuite',
  'DMA hardware': 'dmaHardware',
  'System utility': 'systemUtility',
  'Account recovery': 'accountRecovery',
  Cosmetic: 'cosmetic',
};

export const acquisitionStepIcons: IconName[] = ['acqPackage', 'acqSettings', 'acqZap', 'acqCheck'];

/** After-purchase timeline on product detail — one distinct icon per step */
export const productAcquisitionStepIcons: IconName[] = [
  'liveStatus',
  'acqPackage',
  'headphones',
  'acqCheck',
];

/** Product detail requirement tiles — prefer compat-style icons where mapped */
export const productRequirementIcons: Partial<Record<IconName, IconName>> = {
  reqWindows: 'compatWindows',
  reqSteam: 'compatSteam',
  reqSettings: 'compatPackage',
  reqWifi: 'compatWifi',
  reqCpu: 'compatMonitor',
  reqRestorePoint: 'compatRefresh',
  reqShieldGuide: 'compatShield',
  reqMailOrder: 'mail',
  reqShieldAccount: 'compatShield',
  reqWifiPortal: 'compatWifi',
};

export function requirementDisplayIcon(icon: IconName): IconName {
  return productRequirementIcons[icon] ?? icon;
}

export const compatibilityIcons: IconName[] = [
  'compatWindows',
  'compatPackage',
  'compatSteam',
  'compatMonitor',
  'compatRefresh',
  'compatWifi',
  'compatDiscord',
  'compatShield',
];
