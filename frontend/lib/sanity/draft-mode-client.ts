import { client } from "@/sanity";
import { draftMode } from "next/headers";

export const draftModeClient = () => {
  if (draftMode().isEnabled) {
    return client.withConfig({
      perspective: "previewDrafts",
      useCdn: false,
      stega: true,
    });
  } else {
    return client;
  }
};
