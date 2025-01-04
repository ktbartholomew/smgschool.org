// src/app/actions.ts

"use server";

import { draftMode } from "next/headers";

export async function disableDraftMode() {
  const disable = draftMode().disable();
  const delay = new Promise((resolve) => setTimeout(resolve, 1000));

  await Promise.allSettled([disable, delay]);
}
