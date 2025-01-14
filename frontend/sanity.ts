import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "yqyo9yvq", // you can find this in sanity.json
  apiVersion: "v2022-03-07",
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
  fetch: {
    next: {
      // Cache content requests for up to 10 minutes
      revalidate: 600,
    },
  },
  token: process.env.SANITY_VIEWER_TOKEN,
  stega: {
    studioUrl:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? "http://localhost:3333",
  },
});
