import { randomUUID } from "crypto";

export interface NotificationEntry {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  avatar: string;
  isUnread: boolean;
}

const defaultAvatar = "/assets/images/profile.png";

const seed: NotificationEntry[] = [
  {
    id: randomUUID(),
    actor: "Steve Jobs",
    action: "posted a link in your timeline.",
    timestamp: "42 minutes ago",
    avatar: defaultAvatar,
    isUnread: true,
  },
  {
    id: randomUUID(),
    actor: "An admin",
    action: "changed the name of the group Freelacer usa to Freelacer usa",
    timestamp: "42 minutes ago",
    avatar: defaultAvatar,
    isUnread: true,
  },
  {
    id: randomUUID(),
    actor: "Steve Jobs",
    action: "posted a link in your timeline.",
    timestamp: "1 hour ago",
    avatar: defaultAvatar,
    isUnread: false,
  },
  {
    id: randomUUID(),
    actor: "An admin",
    action: "approved your community invite",
    timestamp: "Today",
    avatar: defaultAvatar,
    isUnread: false,
  },
];

let notificationsStore: NotificationEntry[] = [...seed];

export function listNotifications() {
  return notificationsStore;
}

export function createNotification(input: { actor: string; action: string; timestamp?: string; avatar?: string }) {
  const entry: NotificationEntry = {
    id: randomUUID(),
    actor: input.actor,
    action: input.action,
    timestamp: input.timestamp ?? "Just now",
    avatar: input.avatar ?? defaultAvatar,
    isUnread: true,
  };
  notificationsStore = [entry, ...notificationsStore].slice(0, 25);
  return entry;
}
