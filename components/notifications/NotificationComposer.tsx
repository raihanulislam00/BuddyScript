"use client";

import { FormEvent, useState } from "react";

export function NotificationComposer() {
  const [actor, setActor] = useState("Alina Kost");
  const [action, setAction] = useState("liked your post");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!actor.trim() || !action.trim()) {
      setError("Both actor and action are required");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actor: actor.trim(), action: action.trim() }),
      });
      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Unable to send notification");
      }
      setActor("");
      setAction("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="notification-composer" onSubmit={submit}>
      <input
        type="text"
        placeholder="Actor name"
        value={actor}
        onChange={(event) => setActor(event.target.value)}
      />
      <input
        type="text"
        placeholder="Action description"
        value={action}
        onChange={(event) => setAction(event.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending..." : "Broadcast"}
      </button>
      {error ? <p className="text-danger">{error}</p> : null}
    </form>
  );
}
