"use server";

import { PortableText, PortableTextBlock } from "@portabletext/react";

export default async function TextBlock(props: {
  section: { content: PortableTextBlock[] };
}) {
  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg max-w-prose mx-auto">
      <PortableText value={props.section.content} />
    </section>
  );
}
