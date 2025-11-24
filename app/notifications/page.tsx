import Link from "next/link";
import { redirect } from "next/navigation";

import { NotificationComposer } from "@/components/notifications/NotificationComposer";
import { NotificationsFeed } from "@/components/notifications/NotificationsFeed";
import { listNotifications } from "@/lib/notifications";
import { getCurrentUser } from "@/lib/session";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const notifications = listNotifications();

  return (
    <div className="notifications-page">
      <header className="notifications-page__header">
        <div>
          <p className="muted">Notifications for</p>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <Link href="/feed" className="btn btn-light">
          ← Back to feed
        </Link>
      </header>
      <section className="notifications-card">
        <div className="notifications-panel">
          <div className="notifications-panel__heading">
            <div>
              <p className="muted">Stay updated</p>
              <h1>Notifications</h1>
            </div>
            <button type="button" aria-label="Panel options" className="notifications-panel__menu">
              ⋮
            </button>
          </div>
          <NotificationsFeed initialItems={notifications} />
        </div>
        <div className="notifications-card__composer">
          <h3>Send a test notification</h3>
          <p className="muted">Broadcast a message to see live updates arrive instantly.</p>
          <NotificationComposer />
        </div>
      </section>
    </div>
  );
}
