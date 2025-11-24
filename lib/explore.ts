export interface ExploreStat {
  label: string;
  value: string;
}

export interface ExploreSection {
  title: string;
  body: string;
}

export interface ExploreItem {
  slug: string;
  label: string;
  icon: string;
  badge?: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  highlights: string[];
  stats: ExploreStat[];
  sections: ExploreSection[];
}

export const exploreItems: ExploreItem[] = [
  {
    slug: "learning",
    label: "Learning",
    icon: "🎓",
    badge: "New",
    heroTitle: "Your personal learning lounge",
    heroSubtitle: "Lessons, AMAs, and study buddies in one adaptive space.",
    description: "Curated courses, live workshops, and bite-sized tips tailored to your interests.",
    ctaLabel: "Browse playlists",
    ctaHref: "/courses",
    highlights: [
      "Track progress across playlists",
      "Unlock badges for finishing weekly modules",
      "Collaborate with peers in cohort rooms",
    ],
    stats: [
      { label: "Active cohorts", value: "42" },
      { label: "Weekly lessons", value: "120+" },
      { label: "Coach hours", value: "320" },
    ],
    sections: [
      {
        title: "Guided paths",
        body: "Follow sequenced tracks for design, engineering, or leadership with checkpoints and mentor notes.",
      },
      {
        title: "Live office hours",
        body: "Hop into drop-in rooms with experts who can unblock you in minutes instead of weeks.",
      },
      {
        title: "Peer accountability",
        body: "Set streak goals and get nudges from teammates when you fall behind.",
      },
    ],
  },
  {
    slug: "insights",
    label: "Insights",
    icon: "📊",
    heroTitle: "Signals that keep you ahead",
    heroSubtitle: "Digest AI summaries, key KPIs, and sentiment in under five minutes a day.",
    description: "Monitor metrics, product updates, and leadership briefs without leaving your feed.",
    ctaLabel: "Create dashboard",
    ctaHref: "/insights/new",
    highlights: [
      "Performance snapshots updated hourly",
      "Save insights for weekly recaps",
      "Share highlights to your team with one click",
    ],
    stats: [
      { label: "Connected sources", value: "18" },
      { label: "Alert rules", value: "56" },
      { label: "Avg. response", value: "2m" },
    ],
    sections: [
      {
        title: "Executive briefs",
        body: "Auto-generated decks summarize what moved the needle and why it matters.",
      },
      {
        title: "Scenario planning",
        body: "Run what-if simulations and publish annotated takeaways back to the org.",
      },
      {
        title: "Contextual alerts",
        body: "Avoid noise with machine learning that ranks each update by impact.",
      },
    ],
  },
  {
    slug: "find-friends",
    label: "Find friends",
    icon: "👥",
    heroTitle: "Grow your circle intelligently",
    heroSubtitle: "BuddyScript maps shared experiences so intros feel natural, not spammy.",
    description: "Discover people you actually know through mutual teams, events, and shared goals.",
    ctaLabel: "See suggestions",
    ctaHref: "/friend-requests",
    highlights: [
      "Smart suggestions using shared projects",
      "One-tap introductions with context",
      "Invite contacts by email or workspace link",
    ],
    stats: [
      { label: "Mutual links", value: "230" },
      { label: "Pending invites", value: "14" },
      { label: "Clubs nearby", value: "9" },
    ],
    sections: [
      {
        title: "Warm intros",
        body: "Auto-generate blurbs referencing shared meetings or docs so outreach feels personal.",
      },
      {
        title: "Event radar",
        body: "Know when your contacts land in the same city and spin up instant meetups.",
      },
      {
        title: "Contact sync",
        body: "Securely pull from Google, Outlook, and Slack directories with user consent.",
      },
    ],
  },
  {
    slug: "bookmarks",
    label: "Bookmarks",
    icon: "🔖",
    heroTitle: "Everything you saved, beautifully organized",
    heroSubtitle: "Collections, reminders, and AI summaries keep important finds actionable.",
    description: "Keep posts, files, and voice notes in one tidy place, synced across devices.",
    ctaLabel: "Open library",
    ctaHref: "/bookmarks",
    highlights: [
      "Tag saves for faster recall",
      "Shared folders for team research",
      "Offline access on mobile",
    ],
    stats: [
      { label: "Items saved", value: "1,240" },
      { label: "Shared boards", value: "26" },
      { label: "Reminders", value: "48" },
    ],
    sections: [
      {
        title: "Smart folders",
        body: "Rules auto-group articles by topic, author, or account mention.",
      },
      {
        title: "Remind me",
        body: "Schedule gentle nudges so saved jobs or leads never slip.",
      },
      {
        title: "AI recap",
        body: "Weekly summaries highlight what changed across your collections.",
      },
    ],
  },
  {
    slug: "group",
    label: "Group",
    icon: "👪",
    heroTitle: "Bring your communities together",
    heroSubtitle: "Spin up vibrant spaces for squads, clubs, or alumni in minutes.",
    description: "Launch private or public groups with modular discussion boards and events.",
    ctaLabel: "Create group",
    ctaHref: "/groups/new",
    highlights: [
      "Templates for clubs, squads, and alumni",
      "Rich posts with polls, docs, and clips",
      "Auto-moderation powered by your rules",
    ],
    stats: [
      { label: "Active groups", value: "312" },
      { label: "Weekly events", value: "58" },
      { label: "Moderators", value: "910" },
    ],
    sections: [
      {
        title: "Mod toolkit",
        body: "Escalations, content filters, and approval queues keep discussions healthy.",
      },
      {
        title: "Event hub",
        body: "Plan hybrid sessions with RSVP caps, reminders, and highlight reels.",
      },
      {
        title: "Resource vault",
        body: "Pin guides, templates, and recordings so newcomers ramp quickly.",
      },
    ],
  },
  {
    slug: "gaming",
    label: "Gaming",
    icon: "🎮",
    badge: "New",
    heroTitle: "Play, stream, and cheer with your crew",
    heroSubtitle: "Competitive ladders meet casual hangouts with instant voice and video.",
    description: "Host tournaments, drop clips, and scout trending titles—all inside BuddyScript.",
    ctaLabel: "Launch lobby",
    ctaHref: "/gaming",
    highlights: [
      "Party rooms with low-latency voice",
      "Cross-platform stat tracking",
      "Weekly challenges with XP rewards",
    ],
    stats: [
      { label: "Active lobbies", value: "67" },
      { label: "Clips uploaded", value: "4.2k" },
      { label: "Prize pools", value: "$32k" },
    ],
    sections: [
      {
        title: "Matchmaking",
        body: "Queue with friends or get auto-matched by rank and ping.",
      },
      {
        title: "Creator tools",
        body: "Instantly publish highlight reels with auto-captioning.",
      },
      {
        title: "Season passes",
        body: "Complete weekly quests to unlock cosmetics and XP boosts.",
      },
    ],
  },
  {
    slug: "settings",
    label: "Settings",
    icon: "⚙️",
    heroTitle: "Fine-tune every detail",
    heroSubtitle: "Security, privacy, and accessibility controls that make sense.",
    description: "Control privacy, alerts, and security with clear, human language toggles.",
    ctaLabel: "Review controls",
    ctaHref: "/settings",
    highlights: [
      "Session history with one-tap revoke",
      "Granular notification channels",
      "Accessibility presets for focus modes",
    ],
    stats: [
      { label: "Linked apps", value: "12" },
      { label: "Policies", value: "7" },
      { label: "MFA enabled", value: "98%" },
    ],
    sections: [
      {
        title: "Privacy center",
        body: "Readable descriptions show exactly who can see each surface.",
      },
      {
        title: "Session vault",
        body: "Kill suspicious logins instantly and require re-auth on critical flows.",
      },
      {
        title: "Focus presets",
        body: "Switch between work, travel, or quiet modes and auto-update notification rules.",
      },
    ],
  },
  {
    slug: "save-post",
    label: "Save post",
    icon: "💾",
    heroTitle: "Save smarter",
    heroSubtitle: "Your saved items turn into workflows, not graveyards.",
    description: "Instantly capture anything in your feed and unlock automations around it.",
    ctaLabel: "Capture something",
    ctaHref: "/compose",
    highlights: [
      "Auto-tag recommendations",
      "Follow-up reminders for saved jobs",
      "Export collections to Notion or Slack",
    ],
    stats: [
      { label: "Automation recipes", value: "34" },
      { label: "Shared bundles", value: "18" },
      { label: "Follow-up rate", value: "89%" },
    ],
    sections: [
      {
        title: "Multi-save",
        body: "Clip threads, audio, and files in a single gesture on desktop or mobile.",
      },
      {
        title: "Workflow builder",
        body: "Trigger tasks in Jira, Linear, or Asana every time you save a bug report.",
      },
      {
        title: "Collab folders",
        body: "Share curated reading lists with comments and reactions.",
      },
    ],
  },
];

export function getExploreItem(slug: string) {
  return exploreItems.find((item) => item.slug === slug);
}
