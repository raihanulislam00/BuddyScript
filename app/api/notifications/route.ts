import { NextResponse } from "next/server";

import { createNotification, listNotifications } from "@/lib/notifications";
import { getPusherServer } from "@/lib/pusher";

export async function GET() {
  return NextResponse.json({ notifications: listNotifications() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const actor = body?.actor?.trim();
  const action = body?.action?.trim();
  const avatar = body?.avatar?.trim();

  if (!actor || !action) {
    return NextResponse.json({ error: "actor and action are required" }, { status: 400 });
  }

  const notification = createNotification({ actor, action, avatar });

  try {
    const pusher = getPusherServer();
    await pusher.trigger("notifications", "new-notification", notification);
  } catch (error) {
    console.error("Failed to trigger Pusher notification", error);
  }

  return NextResponse.json({ notification });
}
