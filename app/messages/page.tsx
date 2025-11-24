import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

const inbox = [
  {
    id: "msg-1",
    sender: "Maya Patel",
    preview: "Hey! Just checking in about the design sprint…",
    timestamp: "1m ago",
  },
  {
    id: "msg-2",
    sender: "Leo Martinez",
    preview: "Can you share the latest build?",
    timestamp: "16m ago",
  },
  {
    id: "msg-3",
    sender: "Alina Kost",
    preview: "Loved your recent post!",
    timestamp: "1h ago",
  },
];

export default async function MessagesPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="messages-page">
      <header className="messages-page__header">
        <div>
          <p className="muted">Inbox for</p>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <Link href="/feed" className="btn btn-light">
          ← Back to feed
        </Link>
      </header>
      <section className="messages-card">
        <header>
          <h1>Recent Messages</h1>
          <p>See who has sent you a message.</p>
        </header>
        <ul className="messages-list">
          {inbox.map((message) => (
            <li key={message.id}>
              <div>
                <strong>{message.sender}</strong>
                <p>{message.preview}</p>
              </div>
              <span>{message.timestamp}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
