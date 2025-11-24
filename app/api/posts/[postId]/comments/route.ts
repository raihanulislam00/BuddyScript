import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { commentSchema } from "@/lib/validation";

interface RouteContext {
  params: Promise<{ postId: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await context.params;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { id: true, authorId: true, isPrivate: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  if (post.isPrivate && post.authorId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = await request.json();
  const result = commentSchema.safeParse(payload);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Invalid comment" },
      { status: 400 },
    );
  }

  if (result.data.parentId) {
    const parent = await prisma.comment.findUnique({
      where: { id: result.data.parentId },
      select: { postId: true },
    });

    if (!parent || parent.postId !== post.id) {
      return NextResponse.json({ error: "Invalid parent comment" }, { status: 400 });
    }
  }

  const createdComment = await prisma.comment.create({
    data: {
      content: result.data.content,
      postId: post.id,
      authorId: user.id,
      parentId: result.data.parentId ?? null,
    },
  });

  return NextResponse.json({ commentId: createdComment.id }, { status: 201 });
}
