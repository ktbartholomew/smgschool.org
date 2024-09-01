"use server";

import { PortableText, PortableTextBlock } from "@portabletext/react";
import Image from "next/image";
import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";

async function IImage(props: any) {
  const builder = imageUrl(client);
  const image = builder.image(props.value);

  return (
    <Image
      src={image.url()}
      alt={props.value.caption ?? "image"}
      width={800}
      height={800}
    />
  );
}

export default async function TwoColumnHeroBlock(props: {
  section: { column1: PortableTextBlock[]; column2: PortableTextBlock[] };
  className?: string;
}) {
  return (
    <section
      className={`px-4 py-16 md:py-32 md:px-16 prose hero ${props.className}`}
    >
      <div className="grid md:grid-cols-2 items-center gap-4 md:gap-8">
        <div>
          <PortableText value={props.section.column1} />
        </div>
        <div>
          <PortableText
            value={props.section.column2}
            components={{ types: { image: IImage } }}
          />
        </div>
      </div>
    </section>
  );
}
