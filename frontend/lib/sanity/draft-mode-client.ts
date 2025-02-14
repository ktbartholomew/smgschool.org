import { client } from "@/sanity";
import { draftMode } from "next/headers";

export const draftModeClient = () => {
  if (draftMode().isEnabled) {
    return client.withConfig({
      token: process.env.SANITY_VIEWER_TOKEN,
      perspective: "previewDrafts",
      useCdn: false,
      stega: true,
    });
  } else {
    return client;
  }
};
