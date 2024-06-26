"use server";

import { PageProps } from "@/.next/types/app/[...path]/page";
import FormEmbedBlock from "@/components/blocks/form-embed-block";
import HeroBlock from "@/components/blocks/hero-block";
import OneCauseDonationFormBlock from "@/components/blocks/onecause-donation-form";
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
        | {
            _type: "donationBlock";
            _key: string;
            title?: string;
            challengeUrl: string;
          }
        | {
            _type: "formEmbedBlock";
            _key: string;
            title?: string;
            url: string;
          }
      )[];
      sidebarSections?: {
        _type: "textBlock";
        _key: string;
        title?: string;
        content: PortableTextBlock[];
      }[];
    }[]
  >(`
  *[
    _type == 'page' && slug.current == '/${props.params.path.join("/")}'
  ] {
    ...,
    sections[]{
      ...,
      _type == "heroBlock" => {
        image {
        ...,
        "lqip": @.asset->metadata.lqip,
        "blurHash": @.asset->metadata.blurHash
        }
      }
    }
  }`);

  if (pages.length === 0) {
    return notFound();
  }

  const page = pages[0];
  let heroHeader;

  // If the first section of the page is a hero block, treat it as a full-width
  // page title by removing it from the main sections array and rendering it
  // first. This allows us to render a sidebar alongside the main content, but
  // below the page title.
  if (page.sections?.[0]._type === "heroBlock") {
    heroHeader = page.sections[0];
    page.sections.shift();
  }

  return (
    <>
      <TopNavHeader path={props.params.path} />
      {heroHeader && (
        <header>
          <HeroBlock section={heroHeader} className="h-[50vh]" />
        </header>
      )}
      <div className="flex flex-wrap justify-center">
        <main
          className={
            page.sidebarSections?.length
              ? "basis-full md:basis-auto flex-grow-0"
              : "basis-full"
          }
        >
          {page.sections?.map((s) => {
            switch (s._type) {
              case "heroBlock":
                return (
                  <HeroBlock key={s._key} section={s} className="h-[50vh]" />
                );
              case "textBlock":
                return <TextBlock key={s._key} section={s} />;
              case "donationBlock":
                return <OneCauseDonationFormBlock key={s._key} section={s} />;
              case "formEmbedBlock":
                return <FormEmbedBlock key={s._key} section={s} />;
              default:
                return null;
            }
          })}
        </main>
        {page.sidebarSections?.length ? (
          <aside className="basis-full md:basis-1/4 flex-shrink-0 px-4 py-8 md:px-0">
            {page.sidebarSections.map((s) => {
              return (
                <section
                  key={s._key}
                  className="border border-slate-300 shadow-md rounded-md p-8 mb-8"
                >
                  <div className="prose">
                    <PortableText value={s.content} />
                  </div>
                </section>
              );
            })}
          </aside>
        ) : null}
      </div>
      <SiteFooter />
    </>
  );
}
