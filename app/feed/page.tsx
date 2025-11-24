import { redirect } from "next/navigation";

import { FeedShell } from "@/components/feed/FeedShell";
import { getCurrentUser } from "@/lib/session";

export default async function FeedPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return <FeedShell user={user} />;
}
