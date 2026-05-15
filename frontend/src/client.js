import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "p01j5gsp",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-03-01",
  token: import.meta.env.VITE_SANITY_TOKEN,
});
