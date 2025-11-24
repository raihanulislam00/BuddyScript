import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

const pendingRequests = [
  { id: "maya", name: "Maya Patel", title: "Product Designer", mutual: 12 },
  { id: "leo", name: "Leo Martinez", title: "Senior Frontend Engineer", mutual: 5 },
  { id: "alina", name: "Alina Kost", title: "Growth Strategist", mutual: 9 },
];

export default async function FriendRequestsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="friend-requests-page">
      <header className="friend-requests-page__header">
        <div>
          <p className="muted">Signed in as</p>
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <Link href="/feed" className="btn btn-light">
          ← Back to feed
        </Link>
      </header>
      <section className="friend-requests-card">
        <header>
          <h1>Pending Friend Requests</h1>
          <p>Review who wants to connect with you.</p>
        </header>
        <ul className="friend-requests-list">
          {pendingRequests.map((request) => (
            <li key={request.id}>
              <div className="friend-requests-list__details">
                <img src="/assets/images/profile.png" alt={request.name} />
                <div>
                  <strong>{request.name}</strong>
                  <p>{request.title}</p>
                  <span>{request.mutual} mutual connections</span>
                </div>
              </div>
              <div className="friend-requests-list__actions">
                <button type="button" className="btn btn-primary btn-sm">
                  Accept
                </button>
                <button type="button" className="btn btn-light btn-sm">
                  Ignore
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
