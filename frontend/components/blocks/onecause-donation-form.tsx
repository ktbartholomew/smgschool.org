"use client";

import { useEffect } from "react";

declare class GreatFeats {
  constructor(url: string);

  embedDonationForm: (
    el: HTMLElement,
    parentUrl?: string,
    modal?: boolean
  ) => void;
  createDonationModal: (el: HTMLElement) => void;
  challengeUrl: string;
}

declare global {
  interface Window {
    GreatFeats: typeof GreatFeats;
  }
}

export default function OneCauseDonationFormBlock(props: { section: any }) {
  useEffect(() => {
    const el = document.getElementById("inline-donation-form");
    if (!el || !props.section?.challengeUrl) {
      return;
    }

    const gf = new window.GreatFeats(props.section?.challengeUrl);

    gf.embedDonationForm(el, window.location.href, false);
  }, []);

  return (
    <section>
      <script src="https://greatfeats-assets.s3.amazonaws.com/scripts/embed/0.2.0/greatfeats-embed.min.js"></script>
      <div id="inline-donation-form" className="w-full"></div>
    </section>
  );
}
