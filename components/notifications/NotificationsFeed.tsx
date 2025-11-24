"use client";

import { useEffect, useMemo, useState } from "react";
import Pusher from "pusher-js";

import type { NotificationEntry } from "@/lib/notifications";

interface NotificationsFeedProps {
  initialItems: NotificationEntry[];
}

type Filter = "all" | "unread";

export function NotificationsFeed({ initialItems }: NotificationsFeedProps) {
  const [items, setItems] = useState(initialItems);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

    if (!key || !cluster) {
      console.warn("Pusher environment variables are missing; live notifications disabled.");
      return undefined;
    }

    const client = new Pusher(key, { cluster });
    const channel = client.subscribe("notifications");
    const handler = (payload: NotificationEntry) => {
      setItems((prev) => [payload, ...prev].slice(0, 25));
    };

    channel.bind("new-notification", handler);

    return () => {
      channel.unbind("new-notification", handler);
      client.unsubscribe("notifications");
      client.disconnect();
    };
  }, []);

  const visibleItems = useMemo(() => {
    return filter === "all" ? items : items.filter((item) => item.isUnread);
  }, [filter, items]);

  if (!visibleItems.length) {
    return (
      <div className="notifications-feed">
        <div className="notifications-tabs" role="tablist">
          {(["all", "unread"] as Filter[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={filter === tab}
              className={filter === tab ? "notifications-tab is-active" : "notifications-tab"}
              onClick={() => setFilter(tab)}
            >
              {tab === "all" ? "All" : "Unread"}
            </button>
          ))}
        </div>
        <p className="muted">No notifications to show.</p>
      </div>
    );
  }

  return (
    <div className="notifications-feed">
      <div className="notifications-tabs" role="tablist">
        {(["all", "unread"] as Filter[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filter === tab}
            className={filter === tab ? "notifications-tab is-active" : "notifications-tab"}
            onClick={() => setFilter(tab)}
          >
            {tab === "all" ? "All" : "Unread"}
          </button>
        ))}
      </div>
      <ul className="notifications-items">
        {visibleItems.map((item) => (
          <li key={item.id} className={item.isUnread ? "notifications-item notifications-item--unread" : "notifications-item"}>
            <div className="notifications-item__avatar">
              <img src={item.avatar} alt={item.actor} />
            </div>
            <div className="notifications-item__body">
              <p>
                <strong>{item.actor}</strong> {item.action}
              </p>
              <button type="button" className="notifications-item__time">
                {item.timestamp}
              </button>
            </div>
            <button type="button" className="notifications-item__menu" aria-label="Notification menu">
              ⋮
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
