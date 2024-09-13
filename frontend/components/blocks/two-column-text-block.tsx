"use server";

import { client } from "@/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import Image from "next/image";

const builder = urlBuilder(client);

const components = {
  types: {
    image: (image: { value: SanityImageObject & { caption?: string } }) => {
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
};

export default async function TwoColumnTextBlock(props: {
  section: { column1: PortableTextBlock[]; column2: PortableTextBlock[] };
}) {
  console.log("mmeeeeow");
  return (
    <section className="px-4 py-8 md:px-8 md:text-lg max-w-[90vw] mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose">
          <PortableText value={props.section.column1} components={components} />
        </div>
        <div className="prose">
          <PortableText value={props.section.column2} components={components} />
        </div>
      </div>
    </section>
  );
}
