"use server";

import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { redirect } from "next/navigation";

export async function GET() {
  const { url } = await draftModeClient().fetch(
    '*[_type == "newsletter"] | order(date desc)[0]{url}'
  );

  redirect(url || "/");
}
