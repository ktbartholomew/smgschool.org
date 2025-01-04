"use server";

import HeroBlock from "@/components/blocks/hero-block";
import TwoColumnHeroBlock from "@/components/blocks/two-column-hero-block";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { client } from "@/sanity";

export default async function Home() {
  const page = (
    await client.fetch(`*[_type == 'page' && slug.current == '/_home']`)
  )[0];

  return (
    <>
      <TopNavHeader />
      <main className="">
        <HeroBlock section={page.sections[0]} className="min-h-[80vh]" />
        <TwoColumnHeroBlock section={page.sections[1]} />
        <HeroBlock section={page.sections[2]} className="min-h-[80vh]" />
      </main>
      <SiteFooter />
    </>
  );
}
