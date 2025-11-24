import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

interface RouteContext {
  params: Promise<{ commentId: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { commentId } = await context.params;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      post: { select: { id: true, authorId: true, isPrivate: true } },
    },
  });

  if (!comment) {
    return NextResponse.json({ error: "Comment not found" }, { status: 404 });
  }

  if (comment.post.isPrivate && comment.post.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const existingLike = await prisma.commentLike.findUnique({
    where: {
      commentId_userId: {
        commentId: comment.id,
        userId: user.id,
      },
    },
  });

  if (existingLike) {
    await prisma.commentLike.delete({ where: { id: existingLike.id } });
    return NextResponse.json({ liked: false });
  }

  await prisma.commentLike.create({ data: { commentId: comment.id, userId: user.id } });
  return NextResponse.json({ liked: true });
}
