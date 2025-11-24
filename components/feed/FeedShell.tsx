"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { PostCard } from "@/components/feed/PostCard";
import { PostComposer } from "@/components/feed/PostComposer";
import type { PostDTO, UserSummary } from "@/components/feed/types";
import { exploreItems } from "@/lib/explore";

interface FeedShellProps {
  user: UserSummary;
}

type ThemeMode = "light" | "dark";
type NavPanel = "notifications" | "messages";

interface NavControl {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number;
  panel?: NavPanel;
}

const suggestedPeople = [
  { id: "steve", name: "Steve Jobs", title: "CEO of Apple", avatar: "/assets/images/profile.png" },
  { id: "ryan", name: "Ryan Roslansky", title: "CEO of Linkedin", avatar: "/assets/images/profile.png" },
  { id: "dylan", name: "Dylan Field", title: "CEO of Figma", avatar: "/assets/images/profile.png" },
];

const rightColumnStories = [
  { id: "radovan", name: "Radovan SkillArena", title: "Founder & CEO at Trophy" },
];

const quickEvents = [
  { id: "visibility", title: "Visibility rules", body: "Private posts stay in your feed. Public updates reach every authenticated user." },
  { id: "status", title: "System status", body: "API latency < 120ms · Content scanning enabled" },
];

const friendStatuses = [
  { id: "steve-online", name: "Steve Jobs", role: "CEO of Apple", online: true },
  { id: "ryan-online", name: "Ryan Roslansky", role: "CEO of Linkedin", online: true },
  { id: "dylan-online", name: "Dylan Field", role: "CEO of Figma", online: true },
  { id: "steve-away", name: "Steve Jobs", role: "CEO of Apple", online: false },
];

const notificationHighlights = [
  {
    id: "notif-1",
    actor: "Ryan Roslansky",
    action: "commented on your onboarding update",
    time: "2m ago",
    avatar: "/assets/images/profile.png",
    unread: true,
  },
  {
    id: "notif-2",
    actor: "Product Team",
    action: "pushed a release note to your workspace",
    time: "15m ago",
    avatar: "/assets/images/profile.png",
    unread: true,
  },
  {
    id: "notif-3",
    actor: "Steve Jobs",
    action: "reacted ❤️ to your headline update",
    time: "1h ago",
    avatar: "/assets/images/profile.png",
    unread: false,
  },
];

const messageThreads = [
  {
    id: "msg-1",
    sender: "David Walsh",
    snippet: "We should catch up before the stand-up.",
    time: "Just now",
    avatar: "/assets/images/profile.png",
    unread: true,
  },
  {
    id: "msg-2",
    sender: "Design Sync",
    snippet: "Shared the hero concepts you asked for.",
    time: "12m ago",
    avatar: "/assets/images/profile.png",
    unread: true,
  },
  {
    id: "msg-3",
    sender: "Automation Bot",
    snippet: "Daily digest is ready for review.",
    time: "1h ago",
    avatar: "/assets/images/profile.png",
    unread: false,
  },
];

const navControls: NavControl[] = [
  { id: "home", label: "Home", icon: "🏠", href: "/feed" },
  { id: "requests", label: "Friend Requests", icon: "👥", href: "/friend-requests" },
  { id: "notifications", label: "Notifications", icon: "🔔", badge: 6, panel: "notifications" },
  { id: "messages", label: "Messages", icon: "💬", badge: 2, panel: "messages" },
];

interface StoryCardProps {
  name: string;
  image: string;
  isOwner?: boolean;
  avatar?: string;
}

function StoryCard({ name, image, isOwner, avatar }: StoryCardProps) {
  return (
    <div className="story-card">
      <img src={image} alt={name} className="story-card__cover" />
      <div className="story-card__footer">
        <img src={avatar ?? "/assets/images/profile.png"} alt={name} className="story-card__avatar" />
        <div className="story-card__name">{name}</div>
      </div>
      {isOwner ? (
        <button type="button" className="story-card__add" aria-label="Add story">
          +
        </button>
      ) : null}
    </div>
  );
}

export function FeedShell({ user }: FeedShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [hasHydrated, setHasHydrated] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<NavPanel | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const refreshPosts = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("/api/posts", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to load feed");
        return;
      }
      setPosts(data.posts);
    } catch (err) {
      console.error(err);
      setError("Network error while loading feed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem("feed-theme");
    let resolved: ThemeMode = "dark";
    if (stored === "light" || stored === "dark") {
      resolved = stored;
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      resolved = prefersDark ? "dark" : "light";
    }
    setTheme(resolved);
    document.documentElement.dataset.feedTheme = resolved;
    document.body.dataset.feedTheme = resolved;
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !hasHydrated) {
      return;
    }
    document.documentElement.dataset.feedTheme = theme;
    document.body.dataset.feedTheme = theme;
    window.localStorage.setItem("feed-theme", theme);
  }, [theme, hasHydrated]);

  useEffect(() => {
    if (!infoOpen) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (!infoRef.current) {
        return;
      }
      if (!infoRef.current.contains(event.target as Node)) {
        setInfoOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [infoOpen]);

  useEffect(() => {
    if (!activePanel) {
      return;
    }
    const handleClick = (event: MouseEvent) => {
      if (!panelRef.current) {
        return;
      }
      if (!panelRef.current.contains(event.target as Node)) {
        setActivePanel(null);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [activePanel]);

  useEffect(() => {
    setActivePanel(null);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const stories = useMemo(
    () => [
      {
        id: "owner",
        name: `${user.firstName} ${user.lastName}`.trim() || "Your Story",
        image: "/assets/images/mobile_story_img.png",
        isOwner: true,
        avatar: "/assets/images/profile.png",
      },
      { id: "story-1", name: "Ryan Roslansky", image: "/assets/images/mobile_story_img1.png" },
      { id: "story-2", name: "Ryan Roslansky", image: "/assets/images/mobile_story_img2.png" },
      { id: "story-3", name: "Ryan Roslansky", image: "/assets/images/post_img.png" },
      { id: "story-4", name: "Ryan Roslansky", image: "/assets/images/timeline_img.png" },
    ],
    [user.firstName, user.lastName]
  );

  const setExplicitTheme = (mode: ThemeMode) => {
    setTheme((current) => (current === mode ? current : mode));
  };

  const pageClassName = theme === "dark" ? "feed-page feed-page--dark" : "feed-page feed-page--light";
  const fullName = `${user.firstName} ${user.lastName}`.trim() || "Raihanul Islam";
  const userEmail = user.email ?? "test@example.com";

  const renderFlyoutContent = () => {
    if (!activePanel) {
      return null;
    }
    if (activePanel === "notifications") {
      return (
        <>
          <header className="feed-flyout__header">
            <div>
              <p className="feed-flyout__eyebrow">Inbox</p>
              <h4>Notifications</h4>
            </div>
            <button type="button" className="text-link" onClick={() => router.push("/notifications")}>
              View all
            </button>
          </header>
          <ul className="activity-list">
            {notificationHighlights.map((notification) => (
              <li
                key={notification.id}
                className={notification.unread ? "activity-list__item is-unread" : "activity-list__item"}
              >
                <img src={notification.avatar} alt={notification.actor} className="activity-list__avatar" />
                <div className="activity-list__content">
                  <p>
                    <strong>{notification.actor}</strong> {notification.action}
                  </p>
                  <span className="activity-list__time">{notification.time}</span>
                </div>
                {notification.unread ? <span className="activity-list__dot" aria-label="Unread notification" /> : null}
              </li>
            ))}
          </ul>
        </>
      );
    }
    return (
      <>
        <header className="feed-flyout__header">
          <div>
            <p className="feed-flyout__eyebrow">Inbox</p>
            <h4>Messages</h4>
          </div>
          <button type="button" className="text-link" onClick={() => router.push("/messages")}>
            Open inbox
          </button>
        </header>
        <ul className="message-preview-list">
          {messageThreads.map((thread) => (
            <li key={thread.id} className={thread.unread ? "message-preview is-unread" : "message-preview"}>
              <img src={thread.avatar} alt={thread.sender} />
              <div>
                <div className="message-preview__header">
                  <strong>{thread.sender}</strong>
                  <span className="message-preview__time">{thread.time}</span>
                </div>
                <p>{thread.snippet}</p>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={pageClassName} data-theme={theme}>
      <header className="feed-navbar">
        <div className="feed-navbar__brand">
          <img src="/assets/images/logo.svg" alt="BuddyScript logo" className="feed-navbar__logo" />
          <span className="feed-navbar__brand-text">
            Buddy<span>Script</span>
          </span>
        </div>
        <div className="feed-navbar__search" role="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" fill="none" />
            <line x1="19" y1="19" x2="22" y2="22" stroke="currentColor" />
          </svg>
          <input type="search" placeholder="Input search text" aria-label="Search people, posts, and groups" />
        </div>
        <div className="feed-navbar__actions" aria-label="Primary navigation">
          <div className="feed-navbar__panel" ref={panelRef}>
            <div className="feed-navbar__controls">
            {navControls.map((control) => (
              <button
                key={control.id}
                type="button"
                className={
                    control.panel
                      ? activePanel === control.panel
                        ? "feed-nav-icon feed-nav-icon--active"
                        : "feed-nav-icon"
                      : control.href && pathname === control.href
                        ? "feed-nav-icon feed-nav-icon--active"
                        : "feed-nav-icon"
                  }
                  aria-label={control.label}
                  onClick={() => {
                    if (control.panel) {
                      setActivePanel((current) => (current === control.panel ? null : control.panel));
                      return;
                    }
                    if (control.href) {
                      router.push(control.href);
                    }
                  }}
                  aria-current={
                    control.panel
                      ? activePanel === control.panel
                        ? "page"
                        : undefined
                      : control.href && pathname === control.href
                        ? "page"
                        : undefined
                  }
                  aria-haspopup={control.panel ? "dialog" : undefined}
                  aria-expanded={control.panel ? activePanel === control.panel : undefined}
              >
                <span aria-hidden="true">{control.icon}</span>
                {control.badge ? <span className="feed-badge">{control.badge}</span> : null}
              </button>
            ))}
          </div>
            {activePanel ? (
              <div className="feed-flyout" role="dialog" aria-modal="false" aria-label={`${activePanel} flyout`}>
                {renderFlyoutContent()}
              </div>
            ) : null}
          </div>
          <div className="user-info-dropdown" ref={infoRef}>
            <button
              type="button"
              className="user-info-dropdown__trigger"
              onClick={() => setInfoOpen((prev) => !prev)}
              aria-expanded={infoOpen}
              aria-haspopup="true"
            >
              <img src="/assets/images/profile.png" alt="User avatar" />
              <div>
                <strong>{fullName}</strong>
                <span>{userEmail}</span>
              </div>
              <span className="user-info-dropdown__chevron" aria-hidden="true">
                ▾
              </span>
            </button>
            {infoOpen ? (
              <div className="user-info-dropdown__menu" role="menu">
                <p>
                  <strong>Name:</strong> {fullName}
                </p>
                <p>
                  <strong>Email:</strong> {userEmail}
                </p>
                <button
                  type="button"
                  className="user-info-dropdown__logout"
                  onClick={() => {
                    setInfoOpen(false);
                    void handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main className="feed-grid">
        <aside className="feed-sidebar">
          <section className="card">
            <h3>Explore</h3>
            <ul className="feed-nav-list">
              {exploreItems.map((item) => (
                <li key={item.slug}>
                  <button
                    type="button"
                    className="feed-nav-list__link"
                    onClick={() => router.push(`/explore/${item.slug}`)}
                    aria-label={`Open ${item.label}`}
                  >
                    <span className="feed-nav-list__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {item.badge ? <span className="feed-pill">{item.badge}</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <header className="card__header">
              <h4>Suggested People</h4>
              <button type="button" className="text-link">
                See All
              </button>
            </header>
            <ul className="suggested-list">
              {suggestedPeople.map((person) => (
                <li key={person.id}>
                  <img src={person.avatar} alt={person.name} />
                  <div>
                    <p>{person.name}</p>
                    <small>{person.title}</small>
                  </div>
                  <button type="button" className="btn btn-light btn-sm">
                    Connect
                  </button>
                </li>
              ))}
            </ul>
          </section>
          <section className="card">
            <header className="card__header">
              <h4>Events</h4>
              <button type="button" className="text-link">
                See All
              </button>
            </header>
            <div className="card__body text-muted">Stay up to date with virtual community meetups this week.</div>
          </section>
        </aside>
        <section className="feed-center">
          <div className="story-strip">
            {stories.map((story) => (
              <StoryCard key={story.id} name={story.name} image={story.image} isOwner={story.isOwner} avatar={story.avatar} />
            ))}
          </div>
          <PostComposer onPostCreated={refreshPosts} />
          {loading ? (
            <div className="card text-center py-5">Loading feed...</div>
          ) : error ? (
            <div className="card error-card" role="alert">
              {error}
              <button type="button" className="btn btn-link" onClick={refreshPosts}>
                Retry
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="card text-center py-5">No posts yet. Be the first to share!</div>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} currentUserId={user.id} onChange={refreshPosts} />)
          )}
        </section>
        <aside className="feed-sidebar feed-sidebar--right">
          <section className="card">
            <header className="card__header">
              <h4>You Might Like</h4>
              <button type="button" className="text-link">
                See All
              </button>
            </header>
            {rightColumnStories.map((profile) => (
              <div key={profile.id} className="promo-card">
                <div>
                  <p className="promo-card__title">{profile.name}</p>
                  <small className="text-muted">{profile.title}</small>
                </div>
                <div className="promo-card__actions">
                  <button type="button" className="btn btn-light btn-sm">
                    Ignore
                  </button>
                  <button type="button" className="btn btn-primary btn-sm">
                    Follow
                  </button>
                </div>
              </div>
            ))}
          </section>
          <section className="card">
            <header className="card__header">
              <h4>Your Friends</h4>
              <button type="button" className="text-link">
                See All
              </button>
            </header>
            <div className="input-shell">
              <input type="search" placeholder="Input search text" aria-label="Search friends" />
            </div>
            <ul className="friend-list">
              {friendStatuses.map((friend) => (
                <li key={friend.id}>
                  <img src="/assets/images/profile.png" alt={friend.name} />
                  <div>
                    <p>{friend.name}</p>
                    <small>{friend.role}</small>
                  </div>
                  <span className={friend.online ? "status-dot status-dot--online" : "status-dot"} aria-label={friend.online ? "Online" : "Offline"} />
                </li>
              ))}
            </ul>
          </section>
          {quickEvents.map((block) => (
            <section key={block.id} className="card">
              <h4>{block.title}</h4>
              <p className="text-muted">{block.body}</p>
            </section>
          ))}
        </aside>
      </main>
      <div className="theme-switcher-floating" role="group" aria-label="Theme toggle">
        <button
          type="button"
          className={theme === "light" ? "theme-switcher__option is-active" : "theme-switcher__option"}
          onClick={() => setExplicitTheme("light")}
          aria-pressed={theme === "light"}
        >
          <span aria-hidden="true" className="theme-switcher__icon">
            ☀️
          </span>
          <span className="visually-hidden">Light</span>
        </button>
        <button
          type="button"
          className={theme === "dark" ? "theme-switcher__option is-active" : "theme-switcher__option"}
          onClick={() => setExplicitTheme("dark")}
          aria-pressed={theme === "dark"}
        >
          <span aria-hidden="true" className="theme-switcher__icon">
            🌙
          </span>
          <span className="visually-hidden">Dark</span>
        </button>
      </div>
    </div>
  );
}
