import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const postSelect = {
  id: true,
  content: true,
  imageUrl: true,
  isPrivate: true,
  createdAt: true,
  author: {
    select: { id: true, firstName: true, lastName: true, email: true },
  },
  likes: {
    include: { user: { select: { id: true, firstName: true, lastName: true } } },
  },
  comments: {
    where: { parentId: null },
    orderBy: { createdAt: "asc" as const },
    include: {
      author: { select: { id: true, firstName: true, lastName: true } },
      likes: {
        include: { user: { select: { id: true, firstName: true, lastName: true } } },
      },
      replies: {
        orderBy: { createdAt: "asc" as const },
        include: {
          author: { select: { id: true, firstName: true, lastName: true } },
          likes: {
            include: { user: { select: { id: true, firstName: true, lastName: true } } },
          },
        },
      },
    },
  },
};

type PostWithRelations = Awaited<ReturnType<typeof fetchPosts>>[number];

async function fetchPosts(userId: string) {
  return prisma.post.findMany({
    where: {
      OR: [{ isPrivate: false }, { authorId: userId }],
    },
    orderBy: { createdAt: "desc" },
    select: postSelect,
  });
}

function mapPost(post: PostWithRelations) {
  return {
    ...post,
    likes: post.likes.map((like) => like.user),
    comments: post.comments.map((comment) => ({
      ...comment,
      likes: comment.likes.map((like) => like.user),
      replies: comment.replies.map((reply) => ({
        ...reply,
        likes: reply.likes.map((like) => like.user),
        replies: [],
      })),
    })),
  };
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await fetchPosts(user.id);
  return NextResponse.json({ posts: posts.map(mapPost) });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const content = String(formData.get("content") || "").trim();
  const visibility = String(formData.get("visibility") || "public");
  const image = formData.get("image") as File | null;

  if (!content) {
    return NextResponse.json({ error: "Post content is required" }, { status: 400 });
  }

  let imageUrl: string | null = null;
  if (image && image.size > 0) {
    if (image.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Image size must be under 4MB" }, { status: 400 });
    }
    const buffer = Buffer.from(await image.arrayBuffer());
    imageUrl = `data:${image.type};base64,${buffer.toString("base64")}`;
  }

  const createdPost = await prisma.post.create({
    data: {
      content,
      imageUrl,
      isPrivate: visibility === "private",
      authorId: user.id,
    },
    select: postSelect,
  });

  return NextResponse.json({ post: mapPost(createdPost) }, { status: 201 });
}
