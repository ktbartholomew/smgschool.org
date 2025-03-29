"use server";

import { StickyLogo } from "./sticky-logo";
import Link from "next/link";
import { TEyebrowLink, TNavLink } from "./main-nav-link";
import { MainNavList } from "./main-nav-list";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";

const secondaryLinkClass =
  "px-6 py-2 block text-white no-underline hover:bg-brand-primary transition-colors";

export async function TopNavHeader({ path }: { path?: string }) {
  const urlPath = `/${path ?? ""}`;

  const [eyebrowNavLinks, mainNavLinks] = await Promise.all([
    draftModeClient().fetch<TEyebrowLink[]>(
      `*[_type == 'eyebrowNavLink' ] | order(order asc)`
    ),
    draftModeClient().fetch<TNavLink[]>(
      `*[_type == 'mainNavLink' ]{
      ..., 
      page->{_id, title, slug}, 
      secondaryLinks[]{
        _id,
        title,
        url,
        page->{_id, title, slug}
      }
    } | order(order asc)`,
      {},
      { next: { revalidate: 600 } }
    ),
  ]);

  return (
    <>
      <StickyLogo />
      <header>
        <MainNavList eyebrowLinks={eyebrowNavLinks} links={mainNavLinks} />
        {urlPath.startsWith("/parents") && (
          <div className="bg-brand-primary-700 text-white text-sm md:px-16 overflow-x-auto">
            <ul className="m-0 p-0 list-none flex whitespace-nowrap">
              <li>
                <Link href="/parents/documents" className={secondaryLinkClass}>
                  Documents
                </Link>
              </li>
              <li>
                <Link href="/parents/lunch" className={secondaryLinkClass}>
                  Lunch
                </Link>
              </li>
              <li>
                <Link
                  href="/parents/athletics-clubs"
                  className={secondaryLinkClass}
                >
                  Sports &amp; Clubs
                </Link>
              </li>
              <li>
                <Link href="/parents/volunteer" className={secondaryLinkClass}>
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
