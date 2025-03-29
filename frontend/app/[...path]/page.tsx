"use server";

import { PageProps } from "@/.next/types/app/page";
import FormEmbedBlock from "@/components/blocks/form-embed-block";
import HeroBlock from "@/components/blocks/hero-block";
import SquareDonationFormBlock from "@/components/blocks/square-donation-form";
import PersonListBlock from "@/components/blocks/person-list-block";
import TextBlock from "@/components/blocks/text-block";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { notFound } from "next/navigation";
import { metadata } from "@/app/layout";
import TwoColumnTextBlock from "@/components/blocks/two-column-text-block";
import TwoColumnHeroBlock from "@/components/blocks/two-column-hero-block";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { PortableTextWithAddons } from "@/components/portable-text-with-addons";
import { Page } from "@/lib/page";

async function getPage(props: PageProps) {
  const pages = await draftModeClient().fetch<Page[]>(
    `
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
    },
    _type == "personListBlock" => {
      people[]{
        alternateTitle,
        person->
      }
    }
  }
}`,
    {}
    // { next: { revalidate: 600 } }
  );

  if (pages.length === 0) {
    return notFound();
  }

  return pages[0];
}

// export async function generateStaticParams(): Promise<{ path: string[] }[]> {
//   const pages = await client.fetch<{ slug: { current: string } }[]>(
//     `*[_type == 'page']{slug}`
//   );

//   return pages.map((p) => ({
//     path: p.slug.current.split("/").filter(Boolean),
//   }));
// }

export async function generateMetadata(props: PageProps) {
  const page = await getPage(props);

  return {
    title: [page.seoTitle || page.title || undefined, metadata.title].join(
      " | "
    ),
  };
}

export default async function DynamicPage(props: PageProps) {
  const page = await getPage(props);

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
              case "twoColumnTextBlock":
                return <TwoColumnTextBlock key={s._key} section={s} />;
              case "twoColumnHeroBlock":
                return <TwoColumnHeroBlock key={s._key} section={s} />;
              case "donationBlock":
                return <SquareDonationFormBlock key={s._key} section={s} />;
              case "formEmbedBlock":
                return <FormEmbedBlock key={s._key} section={s} />;
              case "personListBlock":
                return <PersonListBlock key={s._key} section={s} />;
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
                    <PortableTextWithAddons value={s.content} />
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
