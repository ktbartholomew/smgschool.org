"use server";

import { PortableText, PortableTextBlock } from "@portabletext/react";

export default async function TextBlock(props: {
  section: { content: PortableTextBlock[] };
}) {
  return (
    <section className="prose p-8 text-lg max-w-prose mx-auto">
      <PortableText value={props.section.content} />
    </section>
  );
}
