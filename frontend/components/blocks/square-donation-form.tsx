"use server";

import { PortableTextWithAddons } from "../portable-text-with-addons";
import { PopupButton } from "../popup-button";
import { PortableTextBlock } from "next-sanity";

export default async function SquareDonationFormBlock(props: {
  section: { content: PortableTextBlock[]; paymentLinkUrl: string };
}) {
  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg max-w-prose mx-auto">
      <PortableTextWithAddons value={props.section.content} />
      <div className="flex justify-center">
        <PopupButton text="Donate Now" href={props.section.paymentLinkUrl} />
      </div>
    </section>
  );
}
