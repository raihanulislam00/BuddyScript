"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useState } from "react";

import type { CommentDTO } from "./types";

interface CommentThreadProps {
  comment: CommentDTO;
  currentUserId: string;
  postId: string;
  onChange: () => void;
}

function formatRelativeTime(value: string) {
  const date = new Date(value);
  const delta = Date.now() - date.getTime();
  const minutes = Math.floor(delta / (1000 * 60));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

export function CommentThread(props: CommentThreadProps) {
  return <ThreadNode {...props} />;
}

function ThreadNode({ comment, currentUserId, postId, onChange }: CommentThreadProps) {
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userLiked = comment.likes.some((like) => like.id === currentUserId);

  const toggleLike = async () => {
    await fetch(`/api/comments/${comment.id}/like`, { method: "POST" });
    onChange();
  };

  const submitReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyContent.trim()) {
      setError("Reply cannot be empty");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent, parentId: comment.id }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to add reply");
        return;
      }
      setReplyContent("");
      setReplying(false);
      onChange();
    } catch (err) {
      console.error(err);
      setError("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-thread">
      <img src="/assets/images/profile.png" alt="Avatar" className="comment-thread__avatar" />
      <div className="comment-thread__body">
        <div className="comment-thread__bubble">
          <p className="comment-thread__author">
            {comment.author.firstName} {comment.author.lastName}
          </p>
          <p>{comment.content}</p>
        </div>
        <div className="comment-thread__meta">
          <button type="button" onClick={toggleLike}>
            {userLiked ? "Unlike" : "Like"}
          </button>
          <button type="button" onClick={() => setReplying((prev) => !prev)}>
            Reply
          </button>
          <span>{formatRelativeTime(comment.createdAt)}</span>
          {comment.likes.length > 0 ? <span>{comment.likes.length} like(s)</span> : null}
        </div>
        {replying ? (
          <form className="comment-thread__reply" onSubmit={submitReply}>
            <textarea
              rows={2}
              value={replyContent}
              onChange={(event) => setReplyContent(event.target.value)}
              placeholder="Write a reply"
            />
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="comment-thread__reply-actions">
              <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                {submitting ? "Posting..." : "Reply"}
              </button>
              <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setReplying(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}
        {comment.replies.length > 0 ? (
          <div className="comment-thread__children">
            {comment.replies.map((reply) => (
              <ThreadNode key={reply.id} comment={reply} currentUserId={currentUserId} postId={postId} onChange={onChange} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
