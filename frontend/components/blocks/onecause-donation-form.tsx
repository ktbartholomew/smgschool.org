"use client";

import Script from "next/script";

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
  const onload = () => {
    const el = document.getElementById("inline-donation-form");
    if (!el || !props.section?.challengeUrl) {
      return;
    }

    const gf = new window.GreatFeats(props.section?.challengeUrl);

    gf.embedDonationForm(el, window.location.href, false);
  };

  return (
    <section>
      <Script
        src="https://greatfeats-assets.s3.amazonaws.com/scripts/embed/0.2.0/greatfeats-embed.min.js"
        onReady={onload}
      />
      <div id="inline-donation-form" className="w-full"></div>
    </section>
  );
}
