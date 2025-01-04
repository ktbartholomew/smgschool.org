"use server";

import { PortableText, PortableTextBlock } from "@portabletext/react";
import { PortableTextWithAddons } from "../portable-text-with-addons";

export default async function TwoColumnHeroBlock(props: {
  section: { column1: PortableTextBlock[]; column2: PortableTextBlock[] };
  className?: string;
}) {
  return (
    <section className={` prose hero ${props.className}`}>
      <div className="grid md:grid-cols-2 items-center gap-4 md:gap-8">
        <div className="px-4 py-16 md:py-32 md:px-16">
          <PortableText value={props.section.column1} />
        </div>
        <div>
          <PortableTextWithAddons value={props.section.column2} />
        </div>
      </div>
    </section>
  );
}
