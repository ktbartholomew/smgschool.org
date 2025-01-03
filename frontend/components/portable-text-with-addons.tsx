"use server";

import { client } from "@/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getFileAsset, SanityFileAsset } from "@sanity/asset-utils";
import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import Link from "next/link";

export async function PortableTextWithAddons(props: {
  value: PortableTextBlock[];
}) {
  const builder = urlBuilder(client);

  return (
    <PortableText
      value={props.value}
      components={{
        marks: {
          link: (props: {
            children: React.ReactNode;
            value?: {
              href: string;
              blank: boolean;
            };
          }) => {
            if (!props.value) {
              return null;
            }

            return (
              <Link
                href={props.value?.href}
                target={props.value?.blank ? "_blank" : "_self"}
              >
                {props.children}
              </Link>
            );
          },
          fileLink: (props: {
            children: React.ReactNode;
            value?: {
              file: SanityFileAsset;
              blank: boolean;
            };
          }) => {
            if (!props.value) {
              return props.children ?? null;
            }
            const asset = getFileAsset(props.value.file, {
              projectId: client.config().projectId,
              dataset: client.config().dataset,
            });
            return (
              <Link
                href={asset.url}
                target={props.value?.blank ? "_blank" : "_self"}
              >
                {props.children}
              </Link>
            );
          },
        },
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

          // fileEmbed: (props: {
          //   value: { name: string; file: SanityFileAsset };
          // }) => {
          //   const asset = getFileAsset(props.value.file, {
          //     projectId: client.config().projectId,
          //     dataset: client.config().dataset,
          //   });

          //   return (
          //     <a href={asset.url} target="_blank" rel="noreferrer">
          //       {props.value.name}
          //     </a>
          //   );
          // },
        },
      }}
    />
  );
}
