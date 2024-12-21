"use server";

import { client } from "@/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

export async function PortableTextWithAddons(props: {
  value: PortableTextBlock[];
}) {
  const builder = urlBuilder(client);

  return (
    <PortableText
      value={props.value}
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
  );
}
