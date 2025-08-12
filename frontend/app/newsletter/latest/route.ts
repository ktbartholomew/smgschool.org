import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { redirect } from "next/navigation";

export const revalidate = 60;

export async function GET() {
  const { url } = await draftModeClient().fetch(
    `*[
       _type == "newsletter" &&
       dateTime(date) <= dateTime(now())
     ] | order(date desc)[0]{url}`
  );

  redirect(url || "/");
}
