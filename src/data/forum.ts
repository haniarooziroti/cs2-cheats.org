import { blogPostPath } from '../utils/path';

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  seoDescription: string;
  pageHeading: string;
  seoTitle: string;
  shareTitle?: string;
  flair?: string;
  body: string[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Setup & loaders', tone: 'blue', icon: 'settings' },
  { name: 'Patch & VAC', tone: 'orange', icon: 'refresh' },
  { name: 'Faceit & leagues', tone: 'green', icon: 'shield' },
] as const;

export const forumPosts: ForumPost[] = [
  {
    slug: 'aimbot-settings-what-level-buy-risk',
    title: 'Aimbot settings: what level should I run so I do not look blatant?',
    excerpt: 'Editorial note on FOV versus smoothing in Premier demos—start tight, then move one slider per session.',
    seoDescription:
      'Editorial note on CS2 cheat aimbot FOV for Premier—how presets, demo review, and trigger delay interact before you pay for a tier.',
    pageHeading: 'CS2 cheats forum: aimbot FOV without looking blatant',
    seoTitle: 'CS2 aimbot FOV without looking blatant | cs2-cheats.org',
    category: 'General',
    categoryTone: 'purple',
    flair: 'Purchase intent',
    sourceTitle: 'Aimbot smoothing for CS2 ranked queues',
    sourcePath: blogPostPath('cs2-aimbot-smoothing-ranked'),
    body: [
      'These pages are editorial discussions, not live user posts. Aim assist in Counter-Strike 2 is FOV, smoothing, bone priority, and sometimes a separate pistol profile—not a single “safe” number.',
      'A tight FOV with extra smoothing on the AK is easier to explain in a downloaded demo than a wide snap. If a clip looks magnetic, drop first-bullet snap before you widen the cone.',
      'Trigger delay on pistols often shows more than FOV. Change one control per session and re-watch a deathmatch demo before you queue Premier.',
    ],
  },
  {
    slug: 'how-to-install-loader-first-boot',
    title: 'Loader first boot: what did you turn off in antivirus?',
    excerpt: 'Editorial checklist for Defender exclusions on first loader boot—narrow folders, not whole drives.',
    seoDescription:
      'Editorial CS2 cheat loader first-boot notes: Defender exclusion paths, restore-from-quarantine order, and what to send if the DLL still vanishes.',
    pageHeading: 'CS2 cheats loader thread: antivirus exclusions on first boot',
    seoTitle: 'CS2 loader: antivirus exclusions first boot | cs2-cheats.org',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    flair: 'Setup',
    sourceTitle: 'How to install CS2 cheats from the portal',
    sourcePath: blogPostPath('how-to-install-cs2-cheats'),
    body: [
      'Windows Security commonly flags unsigned loaders. Exclude the portal directory and the temp unpack path—not an entire drive.',
      'If a file is already quarantined, restore it once, add the path, then turn real-time protection back on. Reboots after browser or Windows updates can drop an exclusion; re-check the list.',
      'When you open a store ticket, send the exact detection name. Guessing “Defender hates it” slows the reply.',
    ],
  },
  {
    slug: 'faceit-client-worth-extra-price',
    title: 'Faceit + CS2 cheats: is the extra client honestly worth paying for?',
    excerpt: 'Editorial Faceit note: league rules prohibit cheats; Steam Premier is the common fit described on this site.',
    seoDescription:
      'Editorial note on CS2 cheats with the Faceit client versus Steam—cost, ESP limits, and why league queue is a poor reason to pay by itself.',
    pageHeading: 'CS2 cheats on Faceit: is the extra client worth paying for?',
    seoTitle: 'Faceit CS2 extra client: worth paying for | cs2-cheats.org',
    category: 'Faceit & leagues',
    categoryTone: 'green',
    flair: 'Faceit',
    sourceTitle: 'Faceit CS2 cheats: client constraints to know',
    sourcePath: blogPostPath('faceit-cs2-cheats-constraints'),
    body: [
      'Faceit adds its own client checks on top of Steam. This site does not promise compatibility with that client. League rules prohibit cheats wherever we mention Faceit.',
      'If you only queue Faceit, read the paired article before you pay. Steam Premier and scrims are the use cases described in the catalog.',
      'Treat Faceit as higher scrutiny than casual matchmaking even when a portal banner says a build is online.',
    ],
  },
  {
    slug: 'esp-clutter-smoke-sites',
    title: 'ESP clutter on execute-heavy maps—how do you keep smokes readable?',
    excerpt: 'Editorial ESP layout note for Mirage-style executes: boxes first, skeleton on a clutch profile.',
    seoDescription:
      'Editorial CS2 cheat ESP note for execute maps—box-only presets, glow opacity, and why skeleton plus glow together crowd mid-round swaps.',
    pageHeading: 'CS2 cheats ESP clutter: readable overlays on execute maps',
    seoTitle: 'CS2 ESP clutter on execute-heavy maps | cs2-cheats.org',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    sourceTitle: 'Wallhack-style vision without blocking your crosshair',
    sourcePath: blogPostPath('cs2-wallhack-crosshair-layout'),
    body: [
      'Glow plus skeleton at once often chokes fast swaps on execute-heavy T rounds. A box-and-distance preset keeps the crosshair gap readable.',
      'Save skeleton for a second clutch profile instead of stacking every layer on the live competitive cfg.',
      'Drop glow opacity a step before you delete layers—contrast problems look like clutter.',
    ],
  },
  {
    slug: 'trigger-delay-duel-tips',
    title: 'Trigger delay for pistol duels—ms ranges people swear by?',
    excerpt: 'Editorial trigger-delay note: separate pistol and rifle profiles; scale delay with ping.',
    seoDescription:
      'Editorial CS2 cheat trigger-delay note for pistol duels—why one delay for every weapon looks robotic, and how ping changes the feel.',
    pageHeading: 'CS2 cheats forum: trigger delay settings for pistol duels',
    seoTitle: 'CS2 trigger delay for pistol duels | cs2-cheats.org',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'Triggerbot timing for CS2 duel peeks',
    sourcePath: blogPostPath('cs2-triggerbot-peek-timing'),
    body: [
      'A single trigger delay for deagle, CZ, and rifles tends to feel either instant or late. Split pistol and rifle profiles.',
      'What feels crisp at 30 ms ping can prefire at 80 ms. Add a few milliseconds on high-ping routes and log duels offline before ranked.',
      'Turning trigger off for a week is a valid test if the assist is teaching bad crosshair placement.',
    ],
  },
  {
    slug: 'vac-error-after-patch-stories',
    title: 'VAC pop-up after patch—did verify actually fix it for you?',
    excerpt: 'Editorial VAC-after-patch order: stop injecting, verify files, wait for matching banners.',
    seoDescription:
      'Editorial note on VAC errors after CS2 patches—verify, reboot, and pause injections until Steam and the portal agree on the live build.',
    pageHeading: 'CS2 cheats after patches: fixing intermittent VAC pop-ups',
    seoTitle: 'CS2 VAC pop-ups after a game patch | cs2-cheats.org',
    category: 'Patch & VAC',
    categoryTone: 'orange',
    sourceTitle: 'VAC error messages after a CS2 patch',
    sourcePath: blogPostPath('cs2-vac-error-after-patch'),
    body: [
      'A VAC error after a patch is sometimes corrupted files, not an instant ban. Still stop injecting until this site’s banner and the operator portal agree the loader matches the live client.',
      'Exit CS2, verify integrity in Steam, reboot if the error persists, then repair Steam or VAC components if Valve prompts you to.',
      'Tickets need the exact error string, CS2 build, and whether antivirus quarantined a file. Paraphrasing slows everyone down.',
    ],
  },
  {
    slug: 'hwid-spoof-order-matters',
    title: 'HWID spoof order: restore point first or driver wipe first?',
    excerpt: 'Editorial HWID order: restore point, remove old spoof, apply, then a cold boot—not a quick restart.',
    seoDescription:
      'Editorial HWID spoof order for CS2—restore point, old-driver wipe, cold boot, and why laptop BIOS or firmware locks can block a step.',
    pageHeading: 'CS2 cheats HWID spoof thread: restore point vs driver order',
    seoTitle: 'CS2 HWID spoof order: restore vs wipe | cs2-cheats.org',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    sourceTitle: 'HWID spoofing before a new CS2 account',
    sourcePath: blogPostPath('hwid-spoof-new-cs2-account'),
    body: [
      'Hardware identifiers can tie a restriction to a machine. A spoofer helps when a fresh account fails on one PC and works elsewhere—not when only the Steam account is burned.',
      'Typical order: restore point, uninstall the old spoof, apply the new one, then a cold boot. Check identifiers after that boot, not after a quick restart.',
      'Laptop BIOS or firmware locks can block a step. Do not paste serial diffs in public pages; send them through the store ticket if support asks.',
    ],
  },
  {
    slug: 'radar-or-ears-primary',
    title: 'Radar assist vs headphone audio—which do you lean on?',
    excerpt: 'Editorial radar note: treat audio as primary and radar as backup when stacks get loud.',
    seoDescription:
      'Editorial CS2 cheat radar versus audio note—height-offset dots on stacked maps, and why staring at the minimap loses corner fights.',
    pageHeading: 'CS2 cheats discussion: radar assist vs headphone-first play',
    seoTitle: 'CS2 radar assist vs headphone audio | cs2-cheats.org',
    category: 'General',
    categoryTone: 'purple',
    sourceTitle: 'CS2 radar hack overlays vs audio',
    sourcePath: blogPostPath('cs2-radar-hack-audio'),
    body: [
      'Radar layers and ESP both fight information overload. Treat headset audio as primary intel and radar as reinforcement when a site execute is loud.',
      'Multi-level maps need a vertical bias on radar dots or you rotate toward the wrong floor. Cross-check with ESP distance before you throw utility.',
      'A deathmatch session with radar off rebuilds the habit of not staring at the minimap during an execute.',
    ],
  },
  {
    slug: 'stream-proof-obs-nightmare',
    title: 'Stream proof mode still leaked once in OBS—anyone else?',
    excerpt: 'Editorial capture note: flatten nested OBS scenes and test with a local recording, not a live broadcast.',
    seoDescription:
      'Editorial CS2 stream-proof note—nested OBS scenes, browser sources, and Discord screenshare can leak menus even when Game Capture looks clean.',
    pageHeading: 'CS2 cheats stream proof thread: OBS and capture leaks',
    seoTitle: 'CS2 stream proof leaks in OBS capture | cs2-cheats.org',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    sourceTitle: 'Stream proof setup for CS2 overlays',
    sourcePath: blogPostPath('cs2-stream-proof-overlays'),
    body: [
      'Capture-aware modes try to hide overlays from recording APIs. Nested OBS scenes and desktop browser sources still leak menus.',
      'Use Game Capture on the CS2 window only. Turn studio mode off while you test. Record locally before you go live.',
      'Discord screenshare is a separate capture path. A clean OBS preview does not prove a call is clean.',
    ],
  },
  {
    slug: 'elite-slot-wait-real',
    title: 'Elite slot wait—how long did approvals actually take?',
    excerpt: 'Editorial note: this site does not publish approval-hour guarantees; read the store listing and status banner.',
    seoDescription:
      'Editorial CS2 cheat Elite wait note—this site does not invent approval hours. Check the store listing and status banner after checkout.',
    pageHeading: 'CS2 cheats forum: Elite tier slot and approval wait times',
    seoTitle: 'CS2 Elite slot wait after checkout | cs2-cheats.org',
    category: 'General',
    categoryTone: 'purple',
    flair: 'Commercial',
    body: [
      'This site does not have measured approval times for any tier. If a listing mentions a queue, that promise belongs to the store, not to cs2-cheats.org.',
      'After you pay, watch the operator portal and the status banner on this domain. Patch weeks can pause loaders even when checkout already completed.',
      'Do not treat forum-style wait stories as a service-level agreement.',
    ],
  },
  {
    slug: 'esp-colors-colorblind',
    title: 'ESP colors for colorblind modes—any presets worth copying?',
    excerpt: 'Editorial ESP palette note: cyan or gold enemies when reds blend into molotovs; desaturate teammates.',
    seoDescription:
      'Editorial colorblind CS2 cheat ESP note—cyan and gold enemy colors, Inferno contrast, and why stock red/green pairs fail under fire.',
    pageHeading: 'CS2 cheats ESP colors for colorblind-readable overlays',
    seoTitle: 'CS2 ESP colors for colorblind modes | cs2-cheats.org',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    sourceTitle: 'CS2 ESP settings that stay readable in clutches',
    sourcePath: blogPostPath('cs2-esp-settings-clutches'),
    body: [
      'Stock red/green ESP pairs blend into molotovs and Inferno brick. Cyan or gold enemies with a desaturated teammate color are the starting point described in the ESP article.',
      'Dormant players need a second tint so late rotators do not look like active peeks.',
      'There is no guaranteed palette for every type of color vision. Test in deathmatch on the maps you actually play.',
    ],
  },
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
