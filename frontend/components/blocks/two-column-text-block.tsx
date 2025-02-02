"use server";

import { PortableTextBlock } from "@portabletext/react";
import { PortableTextWithAddons } from "../portable-text-with-addons";

export default async function TwoColumnTextBlock(props: {
  section: { column1: PortableTextBlock[]; column2: PortableTextBlock[] };
}) {
  return (
    <section className="px-4 py-8 md:px-8 md:text-lg md:max-w-[90vw] mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose">
          <PortableTextWithAddons value={props.section.column1} />
        </div>
        <div className="prose">
          <PortableTextWithAddons value={props.section.column2} />
        </div>
      </div>
    </section>
  );
}
