"use server";

import { client } from "@/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

export default async function TextBlock(props: {
  section: { content: PortableTextBlock[] };
}) {
  const builder = urlBuilder(client);

  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg max-w-prose mx-auto">
      <PortableText
        value={props.section.content}
        components={{
          types: {
            image: (image: {
              value: SanityImageObject & { caption?: string };
            }) => {
              const src = builder.image(image.value);

              return (
                <Image
                  src={src.url()}
                  alt={image.value.caption ?? ""}
                  width={800}
                  height={800}
                />
              );
            },
          },
        }}
      />
    </section>
  );
}
