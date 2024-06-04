"use server";

import { client } from "@/sanity";
import { SmgSchoolLogo } from "./logo";
import { StickyLogo } from "./sticky-logo";
import Link from "next/link";
import { SecondaryNavController, SecondaryNavList } from "./secondary-nav-list";
import { MainNavLink, TNavLink } from "./main-nav-link";
import HamburgerIcon from "./hamburger-icon";

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
        <SecondaryNavController>
          <nav className="flex items-stretch justify-between md:justify-between bg-brand-primary text-white md:px-16">
            <button className="md:hidden text-3xl p-4">
              <HamburgerIcon />
            </button>
            <div className="flex gap-4 items-center p-2">
              <a href="/">
                {/* Alternatively, we could render a single logo and make its size media-query-aware */}
                <SmgSchoolLogo className="md:hidden" inverse size={64} />
                <SmgSchoolLogo className="hidden md:block" inverse size={100} />
              </a>
              <h2 className="text-2xl font-semibold m-0 hidden lg:block text-balance">
                Saint Maria Goretti Catholic School
              </h2>
            </div>

            <div className="w-[64px] md:hidden">
              {/* A dummy div to balance the flexbox layout */}
            </div>
            <ul className="hidden fixed top-0 left-0 w-[100vh] h-[100vh] px-4 z-50 md:static md:w-auto md:h-auto md:flex md:z-auto bg-brand-primary items-stretch text-xl md:text-lg">
              {mainNavLinks.map((m) => {
                return (
                  <li key={m._id} className="py-4 md:py-0">
                    <MainNavLink link={m} currentPath={urlPath} />
                    <ul className="md:hidden text-base">
                      {m.secondaryLinks?.map((link) => {
                        const href =
                          (link.page ? link.page?.slug.current : link.url) ??
                          "";
                        return (
                          <li key={link._id}>
                            <Link
                              className="block p-4 text-white no-underline hover:underline"
                              href={href}
                            >
                              {link.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>

          {mainNavLinks.map((m) => (
            <SecondaryNavList key={m._id} navLinkId={m._id}>
              <ul>
                {m.secondaryLinks?.map((link) => {
                  const href =
                    (link.page ? link.page?.slug.current : link.url) ?? "";
                  return (
                    <li key={link._id}>
                      <Link
                        className="block p-4 px-6 text-white no-underline hover:underline"
                        href={href}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SecondaryNavList>
          ))}
        </SecondaryNavController>
      </header>
    </>
  );
}
