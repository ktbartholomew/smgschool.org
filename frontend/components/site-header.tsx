"use server";

import { client } from "@/sanity";
import { StickyLogo } from "./sticky-logo";
import Link from "next/link";
import { TNavLink } from "./main-nav-link";
import { MainNavList } from "./main-nav-list";

export async function TopNavHeader({ path }: { path?: string }) {
  const urlPath = `/${path ?? ""}`;

  const eyebrowLinkClass =
    "px-6 py-2 block text-white no-underline hover:bg-brand-primary transition-colors";

  const eyebrowNavLinks = await client.fetch<
    {
      _id: string;
      _createdAt: string;
      _updatedAt: string;
      text: string;
      url: string;
      newTab: boolean;
    }[]
  >(`*[_type == 'eyebrowNavLink' ] | order(order asc)`);

  const mainNavLinks = await client.fetch<TNavLink[]>(
    `*[_type == 'mainNavLink' ]{
      ..., 
      page->{_id, title, slug}, 
      secondaryLinks[]{
        title,
        url,
        page->{_id, title, slug}
      }
    } | order(order asc)`
  );

  return (
    <>
      <StickyLogo />
      <header>
        <nav className="hidden md:flex bg-brand-primary-700 text-white text-sm md:px-16">
          <ul className="flex items-center">
            {eyebrowNavLinks.map((l) => (
              <li key={l._id}>
                <Link
                  className={eyebrowLinkClass}
                  href={l.url}
                  target={l.newTab ? "_blank" : "_self"}
                >
                  {l.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MainNavList links={mainNavLinks} />
      </header>
    </>
  );
}
