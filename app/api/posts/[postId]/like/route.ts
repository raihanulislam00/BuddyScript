import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

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

  const existingLike = await prisma.postLike.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: user.id,
      },
    },
  });

  if (existingLike) {
    await prisma.postLike.delete({ where: { id: existingLike.id } });
    return NextResponse.json({ liked: false });
  }

  await prisma.postLike.create({ data: { postId, userId: user.id } });
  return NextResponse.json({ liked: true });
}
