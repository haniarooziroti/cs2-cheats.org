import { blogPostPath } from '../utils/path';

export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Setup & loaders', tone: 'blue', icon: 'settings' },
  { name: 'Patch & VAC', tone: 'orange', icon: 'refresh' },
  { name: 'Faceit & leagues', tone: 'green', icon: 'shield' },
] as const;

function thread(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  flair?: string;
  sourceTitle?: string;
  sourcePath?: string;
  upvotes: number;
  age: string;
  body: string[];
  comments: ForumComment[];
}): ForumPost {
  const totalReplies = input.comments.reduce((acc, c) => acc + 1 + (c.replies?.length ?? 0), 0);
  return {
    ...input,
    author: 'mods',
    commentsCount: totalReplies,
  };
}

export const forumPosts: ForumPost[] = [
  thread({
    slug: 'aimbot-settings-what-level-buy-risk',
    title: 'Aimbot settings: what level should I run so I do not look blatant?',
    excerpt: 'Trading FOV for trust in Premier—what worked and what got me roasted in downloaded replays.',
    category: 'General',
    categoryTone: 'purple',
    flair: 'Purchase intent',
    upvotes: 214,
    age: '3h ago',
    sourceTitle: 'Aimbot smoothing for CS2 ranked queues',
    sourcePath: blogPostPath('cs2-aimbot-smoothing-ranked'),
    body: [
      'I bumped from 2.3 to 4.1 FOV on my Pro tier and immediately felt/snaps look sharper in demos—looking for someone to sanity-check where they stop.',
      'Not asking for “safe forever” talk—just how others pair smoothing with trigger delay on pistol rounds.',
    ],
    comments: [
      {
        author: 'slow_peek',
        age: '2h ago',
        score: 38,
        body: 'I keep legit FOV around 3.2 on 16:9 with extra smoothing on AK. When I went to 5 it looked fine in-game but horrible in replay.',
      },
      {
        author: 'tilted_twice',
        age: '2h ago',
        score: 21,
        body: 'Honestly I regret maxing snap speed. Got called out by a friend reviewing my clip—dialed back same night.',
      },
      {
        author: 'mods',
        age: '1h ago',
        score: 12,
        body: 'We link buyers to the aim article above—start with defaults, then move sliders once per day, not mid-match.',
        replies: [
          { author: 'slow_peek', age: '55m ago', score: 6, body: 'Yeah the “one slider per session” line in that post actually helped me chill out.' },
        ],
      },
      {
        author: 'anchor_city',
        age: '40m ago',
        score: 9,
        body: 'Trigger delay matters more than FOV for me—0 ms on deagle looks sus even if aim is soft.',
      },
    ],
  }),
  thread({
    slug: 'how-to-install-loader-first-boot',
    title: 'Loader first boot: what did you turn off in antivirus?',
    excerpt: 'Windows Security kept quarantining the DLL—want to know what folders people excluded without nuking whole drives.',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    flair: 'Setup',
    upvotes: 178,
    age: '5h ago',
    sourceTitle: 'How to install CS2 cheats from the portal',
    sourcePath: blogPostPath('how-to-install-cs2-cheats'),
    body: [
      'Followed the article but Defender still snagged the injector until I added the portal folder. Sharing what worked on Win11 23H2.',
    ],
    comments: [
      { author: 'defend_me_not', age: '4h ago', score: 44, body: 'Excluded the whole portal directory plus the temp unpack path. No full-disk exclusions—too risky.' },
      { author: 'fresh_win', age: '3h ago', score: 28, body: 'Worked fine until an Edge update reboot—had to re-allow. Annoying but not the cheat’s fault.' },
      {
        author: 'mods',
        age: '3h ago',
        score: 15,
        body: 'If Defender still grabs files after exclusions, pause real-time once, restore, then add the path—support needs the exact detection name.',
      },
      { author: 'paranoid_pete', age: '2h ago', score: -2, body: 'I nuked the download and bought a different site key instead. Probably overreacted.' },
    ],
  }),
  thread({
    slug: 'faceit-client-worth-extra-price',
    title: 'Faceit + CS2 cheats: is the extra client honestly worth paying for?',
    excerpt: 'VAC scares me less than league software—did anyone stay subscribed mainly for Faceit?',
    category: 'Faceit & leagues',
    categoryTone: 'green',
    flair: 'Faceit',
    upvotes: 305,
    age: '1d ago',
    sourceTitle: 'Faceit CS2 cheats: client constraints to know',
    sourcePath: blogPostPath('faceit-cs2-cheats-constraints'),
    body: [
      'I queue Faceit maybe 30% of the time. Article says some ESP layers conflict—wondering if I should stay Steam-only.',
    ],
    comments: [
      { author: 'hub_only', age: '22h ago', score: 67, body: 'I stopped Faceit entirely after one anticheat update. Steam Premier is stressful enough.' },
      { author: 'league_dream', age: '20h ago', score: 41, body: 'Still testing minimal ESP there—not worth the stress if you treat it like matchmaking.' },
      { author: 'angry_bracket', age: '18h ago', score: 12, body: 'Got a 30-day cooldown unrelated to cheats and blamed the software anyway. Probably unfair of me.' },
      { author: 'mods', age: '17h ago', score: 20, body: 'We do not promise any third-party client compatibility—read the article before you pay for that alone.' },
      { author: 'microwave', age: '15h ago', score: 8, body: 'Main account only on Steam, smurf experiments on Faceit—still sweaty.' },
    ],
  }),
  thread({
    slug: 'esp-clutter-smoke-sites',
    title: 'ESP clutter on execute-heavy maps—how do you keep smokes readable?',
    excerpt: 'Mirage A execs flood my screen; looking for layout ideas from the wallhack article.',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    upvotes: 141,
    age: '6h ago',
    sourceTitle: 'Wallhack-style vision without blocking your crosshair',
    sourcePath: blogPostPath('cs2-wallhack-crosshair-layout'),
    body: [
      'Glow + skeleton together chokes me during fast swaps. Anyone else run box-only on T side?',
    ],
    comments: [
      { author: 'retake_junkie', age: '5h ago', score: 33, body: 'Box + distance text only. Skeleton on a second profile for clutch watchdog.' },
      { author: 'glow_hard', age: '5h ago', score: 19, body: 'I actually like glow thick on Ancient—maybe I am weird.' },
      { author: 'mods', age: '4h ago', score: 11, body: 'Try pushing glow opacity down 20% before deleting layers—you might just need contrast fixes.' },
    ],
  }),
  thread({
    slug: 'trigger-delay-duel-tips',
    title: 'Trigger delay for pistol duels—ms ranges people swear by?',
    excerpt: 'Ancient doorway jiggle wars—article mentions delay vs burst; need numbers from humans.',
    category: 'General',
    categoryTone: 'purple',
    upvotes: 96,
    age: '12h ago',
    sourceTitle: 'Triggerbot timing for CS2 duel peeks',
    sourcePath: blogPostPath('cs2-triggerbot-peek-timing'),
    body: [
      'Running Pro tier, deagle feels either too slow or instant laser—looking for middle ground anecdotes.',
    ],
    comments: [
      { author: 'jiggle_fest', age: '11h ago', score: 27, body: '12–18 ms on deag, 6–8 on rifles. Trash on long-range pistols though.' },
      { author: 'trust_issues', age: '10h ago', score: 14, body: 'Turned trigger off entirely last week—felt cleaner mentally even if stats dipped.' },
      { author: 'mods', age: '9h ago', score: 7, body: 'Note your ping in tickets—delay should scale slightly upward on high ping routes.' },
      { author: 'lag_meme', age: '8h ago', score: 5, body: '80 ping crew: I add ~5 ms vs what NA players post.' },
    ],
  }),
  thread({
    slug: 'vac-error-after-patch-stories',
    title: 'VAC pop-up after patch—did verify actually fix it for you?',
    excerpt: 'Following the VAC article but Steam still complains intermittently.',
    category: 'Patch & VAC',
    categoryTone: 'orange',
    upvotes: 88,
    age: '2d ago',
    sourceTitle: 'VAC error messages after a CS2 patch',
    sourcePath: blogPostPath('cs2-vac-error-after-patch'),
    body: [
      'I stopped injections until the banner flipped green—curious how many people rushed anyway.',
    ],
    comments: [
      { author: 'patient_one', age: '1d ago', score: 31, body: 'Verify + reboot fixed it. Did not touch cheats for two days—boring but worked.' },
      { author: 'impulse_buy', age: '1d ago', score: 4, body: 'Rushed back in and got a second error. Deserved it tbh.' },
      { author: 'mods', age: '1d ago', score: 18, body: 'If verify fails twice, open a ticket with the exact error string—do not paraphrase.' },
    ],
  }),
  thread({
    slug: 'hwid-spoof-order-matters',
    title: 'HWID spoof order: restore point first or driver wipe first?',
    excerpt: 'New Steam account kept dying until I cold rebooted—compare notes with the HWID article.',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    upvotes: 74,
    age: '3d ago',
    sourceTitle: 'HWID spoofing before a new CS2 account',
    sourcePath: blogPostPath('hwid-spoof-new-cs2-account'),
    body: [
      'Worried I skipped a step—want a second opinion before I try again on a laptop.',
    ],
    comments: [
      { author: 'fresh_ssd', age: '2d ago', score: 22, body: 'Restore point → uninstall old spoof → apply new → cold boot. Article order matches what support told me.' },
      { author: 'laptop_sigh', age: '2d ago', score: 9, body: 'Laptop BIOS blocked one step—had to bail. Not the software’s fault but still frustrating.' },
      { author: 'mods', age: '2d ago', score: 11, body: 'DM serial diffs through email only—do not paste them in public threads.' },
    ],
  }),
  thread({
    slug: 'radar-or-ears-primary',
    title: 'Radar assist vs headphone audio—which do you lean on?',
    excerpt: 'Trying not to stare at minimap during executes—talking about the radar/audio article.',
    category: 'General',
    categoryTone: 'purple',
    upvotes: 63,
    age: '4d ago',
    sourceTitle: 'CS2 radar hack overlays vs audio',
    sourcePath: blogPostPath('cs2-radar-hack-audio'),
    body: [
      'I hear footsteps fine but choke under pressure—wonder if radar is crutch or tool.',
    ],
    comments: [
      { author: 'audio_main', age: '3d ago', score: 19, body: 'Radar is insurance when stacks are loud. Still trust ears first.' },
      { author: 'map_glued', age: '3d ago', score: 8, body: 'I stare at radar too much and die to corners—working on disabling it every other round.' },
      { author: 'mods', age: '3d ago', score: 6, body: 'Try deathmatch with radar off one session per week to rebuild instincts.' },
    ],
  }),
  thread({
    slug: 'stream-proof-obs-nightmare',
    title: 'Stream proof mode still leaked once in OBS—anyone else?',
    excerpt: 'Followed stream article but Browser Source pickoff caught a menu flicker.',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    upvotes: 112,
    age: '1d ago',
    sourceTitle: 'Stream proof setup for CS2 overlays',
    sourcePath: blogPostPath('cs2-stream-proof-overlays'),
    body: [
      'Not blaming the tool—probably my scene collection—but sharing so others triple-check nested scenes.',
    ],
    comments: [
      { author: 'obs_grumpy', age: '20h ago', score: 35, body: 'Nested scenes + studio mode off spilled once. Flattened layers like the article warned.' },
      { author: 'offline_only', age: '19h ago', score: 14, body: 'I stopped streaming ranked entirely. Safer mentally.' },
      { author: 'mods', age: '18h ago', score: 12, body: 'Send a short OBS log if it happens twice—we track capture APIs case by case.' },
      { author: 'clip_farm', age: '17h ago', score: 6, body: 'Capture looked clean but Discord screenshare caught menu. Embarrassing in VC.' },
    ],
  }),
  thread({
    slug: 'elite-slot-wait-real',
    title: 'Elite slot wait—how long did approvals actually take?',
    excerpt: 'Trying to decide if priority rebuild queue hype is real.',
    category: 'General',
    categoryTone: 'purple',
    flair: 'Commercial',
    upvotes: 54,
    age: '5d ago',
    body: [
      'Support said “a few hours” but it became overnight for me—still faster than freeware discord chaos.',
    ],
    comments: [
      { author: 'night_owl', age: '4d ago', score: 16, body: 'Mine was six hours after a small patch—acceptable.' },
      { author: 'impatient_kid', age: '4d ago', score: -4, body: 'Waited two days and flipped out in DMs. They were calm, I was not. My bad.' },
      { author: 'mods', age: '4d ago', score: 9, body: 'Peak patch weeks stretch waits—banner will say if queues spike.' },
    ],
  }),
  thread({
    slug: 'esp-colors-colorblind',
    title: 'ESP colors for colorblind modes—any presets worth copying?',
    excerpt: 'Using the ESP clutch article palette but reds/greens still blend.',
    category: 'Setup & loaders',
    categoryTone: 'blue',
    upvotes: 47,
    age: '6d ago',
    sourceTitle: 'CS2 ESP settings that stay readable in clutches',
    sourcePath: blogPostPath('cs2-esp-settings-clutches'),
    body: [
      'Swapped enemy to cyan per article—teammates still look too close to wall colors for me.',
    ],
    comments: [
      { author: 'cyan_fan', age: '5d ago', score: 14, body: 'Cyan enemy + mustard dormant saved me on Inferno.' },
      { author: 'mods', age: '5d ago', score: 8, body: 'We can suggest palettes if you email deuteranopia/protanopia—no promises on perfection.' },
    ],
  }),
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
