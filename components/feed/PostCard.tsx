"use client";

/* eslint-disable @next/next/no-img-element */

import { FormEvent, useRef, useState } from "react";

import { CommentThread } from "@/components/feed/CommentThread";
import type { PostDTO } from "./types";

interface PostCardProps {
  post: PostDTO;
  currentUserId: string;
  onChange: () => void | Promise<void>;
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

export function PostCard({ post, currentUserId, onChange }: PostCardProps) {
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const userLiked = post.likes.some((like) => like.id === currentUserId);

  const toggleLike = async () => {
    await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
    await Promise.resolve(onChange());
  };

  const focusComment = () => {
    commentInputRef.current?.focus();
  };

  const submitComment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!commentContent.trim()) {
      setCommentError("Please enter a comment");
      return;
    }

    setSubmitting(true);
    setCommentError(null);
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      });
      const data = await response.json();
      if (!response.ok) {
        setCommentError(data.error ?? "Unable to add comment");
        return;
      }
      setCommentContent("");
      await Promise.resolve(onChange());
    } catch (err) {
      console.error(err);
      setCommentError("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  const likeNames = post.likes.map((like) => `${like.firstName} ${like.lastName}`);
  const visibleLikes = post.likes.slice(0, 5);
  const remainingLikes = Math.max(post.likes.length - visibleLikes.length, 0);
  const shareCount = Math.max(post.likes.length * 3, 12);
  const commentLabel = `${post.comments.length} Comment${post.comments.length === 1 ? "" : "s"}`;
  const shareLabel = `${shareCount} Share${shareCount === 1 ? "" : "s"}`;

  return (
    <article className="post-card card">
      <header className="post-card__header">
        <div className="post-card__author">
          <img src="/assets/images/profile.png" alt={`${post.author.firstName} ${post.author.lastName}`} />
          <div>
            <p>
              {post.author.firstName} {post.author.lastName}
            </p>
            <small>
              {formatRelativeTime(post.createdAt)} · {post.isPrivate ? "Private" : "Public"}
            </small>
          </div>
        </div>
        <button type="button" className="post-card__dots" aria-label="Post menu">
          ⋮
        </button>
      </header>
      <div className="post-card__body">
        <p>{post.content}</p>
        {post.imageUrl ? (
          <div className="post-card__media">
            <img src={post.imageUrl} alt="Post attachment" />
          </div>
        ) : null}
      </div>
      <div className="post-card__reaction-row">
        <div className="avatar-stack" aria-label={`${likeNames.length} total reactions`}>
          {visibleLikes.length > 0 ? (
            visibleLikes.map((like) => (
              <div key={like.id} className="avatar-stack__item">
                <img src="/assets/images/profile.png" alt={`${like.firstName} ${like.lastName}`} />
              </div>
            ))
          ) : (
            <span className="avatar-stack__more">Be the first to react</span>
          )}
          {remainingLikes > 0 ? <span className="avatar-stack__more">+{remainingLikes}</span> : null}
        </div>
        <div className="post-card__stats">
          <span>{commentLabel}</span>
          <span>{shareLabel}</span>
        </div>
      </div>
      <div className="post-card__actions">
        <button type="button" onClick={toggleLike} className={userLiked ? "active" : undefined}>
          😊 Haha
        </button>
        <button type="button" onClick={focusComment}>
          💬 Comment
        </button>
        <button type="button">
          ↗ Share
        </button>
      </div>
      <form className="comment-composer" onSubmit={submitComment}>
        <img src="/assets/images/profile.png" alt="Your avatar" />
        <div className="comment-input-shell">
          <input
            ref={commentInputRef}
            type="text"
            placeholder="Write a comment"
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
          <div className="comment-input-shell__icons">
            <button type="button" aria-label="Add sticker">
              😊
            </button>
            <button type="button" aria-label="Record voice">
              🎤
            </button>
            <button type="submit" aria-label="Send comment" disabled={submitting}>
              ➤
            </button>
          </div>
        </div>
      </form>
      {commentError ? <p className="text-danger">{commentError}</p> : null}
      <div className="post-card__comments">
        {post.comments.map((comment) => (
          <CommentThread key={comment.id} comment={comment} currentUserId={currentUserId} postId={post.id} onChange={onChange} />
        ))}
      </div>
    </article>
  );
}
