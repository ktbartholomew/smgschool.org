// client.ts
import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "e6jjrj2e", // you can find this in sanity.json
  apiVersion: "v2022-03-07",
  dataset: "production", // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});
