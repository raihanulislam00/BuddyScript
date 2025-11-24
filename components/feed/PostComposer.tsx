"use client";

import { ChangeEvent, FormEvent, useState } from "react";

interface PostComposerProps {
  onPostCreated: () => void;
}

export function PostComposer({ onPostCreated }: PostComposerProps) {
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [attachmentLabel, setAttachmentLabel] = useState("Photo");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setImage(file);
    if (file) {
      setAttachmentLabel(file.name.length > 16 ? `${file.name.slice(0, 13)}…` : file.name);
    } else {
      setAttachmentLabel("Photo");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!content.trim()) {
      setError("Share something with your network");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("content", content.trim());
      formData.append("visibility", visibility);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to share post");
        return;
      }

      setContent("");
      setImage(null);
      await Promise.resolve(onPostCreated());
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card composer-card">
      <form onSubmit={handleSubmit}>
        <div className="composer-card__row">
          <img src="/assets/images/profile.png" alt="Profile" className="composer-card__avatar" />
          <textarea
            className="composer-card__textarea"
            rows={3}
            placeholder="Write something..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className="composer-card__actions">
          <label className="composer-chip">
            <input type="file" accept="image/*" className="visually-hidden" onChange={handleFileChange} />
            <span role="img" aria-hidden="true">
              📷
            </span>
            {attachmentLabel}
          </label>
          <button type="button" className="composer-chip" title="Video upload coming soon" disabled>
            <span role="img" aria-hidden="true">
              🎬
            </span>
            Video
          </button>
          <button type="button" className="composer-chip" title="Event coming soon" disabled>
            <span role="img" aria-hidden="true">
              📅
            </span>
            Event
          </button>
          <button type="button" className="composer-chip" title="Article coming soon" disabled>
            <span role="img" aria-hidden="true">
              📝
            </span>
            Article
          </button>
          <div className="composer-select">
            <label htmlFor="visibility-select" className="visually-hidden">
              Visibility
            </label>
            <select id="visibility-select" value={visibility} onChange={(event) => setVisibility(event.target.value)}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
        {error ? <p className="text-danger composer-card__error">{error}</p> : null}
      </form>
    </div>
  );
}
