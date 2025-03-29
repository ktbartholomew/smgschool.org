"use server";

import HeroBlock from "@/components/blocks/hero-block";
import TwoColumnHeroBlock from "@/components/blocks/two-column-hero-block";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";

export default async function Home() {
  const page = (
    await draftModeClient().fetch(
      `*[_type == 'page' && slug.current == '/_home']`,
      {},
      { next: { revalidate: 60 } }
    )
  )[0];

  return (
    <>
      <TopNavHeader />
      <main className="">
        <HeroBlock
          section={page.sections[0]}
          className="md:min-h-[780px] h-[80vh]"
        />
        <HeroBlock
          section={page.sections[1]}
          className="md:min-h-[780px] h-[80vh]"
        />
        <TwoColumnHeroBlock section={page.sections[2]} />
        <HeroBlock
          section={page.sections[3]}
          className="md:min-h-[780px] h-[80vh]"
        />
      </main>
      <SiteFooter />
    </>
  );
}
