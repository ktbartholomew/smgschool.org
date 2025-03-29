"use server";

import HeroBlock from "@/components/blocks/hero-block";
import SquareDonationFormBlock from "@/components/blocks/square-donation-form";
import TwoColumnHeroBlock from "@/components/blocks/two-column-hero-block";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { Page } from "@/lib/page";

export default async function Home() {
  const page = (
    await draftModeClient().fetch<Page[]>(
      `*[_type == 'page' && slug.current == '/_home']`,
      {},
      { next: { revalidate: 60 } }
    )
  )[0];

  return (
    <>
      <TopNavHeader />
      <main>
        {page.sections?.map((section) => {
          switch (section._type) {
            case "heroBlock":
              return (
                <HeroBlock
                  section={section}
                  key={section._key}
                  className="md:min-h-[780px] h-[80vh]"
                />
              );
            case "twoColumnHeroBlock":
              return (
                <TwoColumnHeroBlock section={section} key={section._key} />
              );
            case "donationBlock":
              return (
                <SquareDonationFormBlock section={section} key={section._key} />
              );
            default:
              return null;
          }
        })}
      </main>
      <SiteFooter />
    </>
  );
}
