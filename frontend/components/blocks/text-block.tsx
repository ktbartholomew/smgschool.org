"use server";

import { client } from "@/sanity";
import { PortableTextBlock } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { PortableTextWithAddons } from "../portable-text-with-addons";

export default async function TextBlock(props: {
  section: { content: PortableTextBlock[] };
}) {
  const builder = urlBuilder(client);

  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg max-w-prose mx-auto">
      <PortableTextWithAddons value={props.section.content} />
    </section>
  );
}
