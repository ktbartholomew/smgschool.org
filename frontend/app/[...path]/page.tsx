"use server";

import { PageProps } from "@/.next/types/app/[...path]/page";
import HeroBlock from "@/components/blocks/hero-block";
import TextBlock from "@/components/blocks/text-block";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { client } from "@/sanity";
import { PortableText, PortableTextBlock } from "@portabletext/react";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { notFound } from "next/navigation";

export default async function DynamicPage(props: PageProps) {
  const pages = await client.fetch<
    {
      _id: string;
      title: string;
      sections: (
        | {
            _type: "textBlock";
            _key: string;
            title?: string;
            content: PortableTextBlock[];
          }
        | {
            _type: "heroBlock";
            _key: string;
            title?: string;
            image?: SanityImageSource & SanityImageObject;
          }
      )[];
    }[]
  >(`*[_type == 'page' && slug.current == '/${props.params.path.join("/")}']`);

  if (pages.length === 0) {
    return notFound();
  }

  const page = pages[0];

  return (
    <>
      <TopNavHeader path={props.params.path} />
      <main>
        {page.sections?.map((s) => {
          switch (s._type) {
            case "heroBlock":
              return <HeroBlock key={s._key} section={s} />;
            case "textBlock":
              return <TextBlock key={s._key} section={s} />;
            default:
              return null;
          }
        })}
      </main>
      <SiteFooter />
    </>
  );
}
