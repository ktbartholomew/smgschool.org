"use server";

import { client } from "@/sanity";
import { SmgSchoolLogo } from "./logo";
import { StickyLogo } from "./sticky-logo";
import Link from "next/link";
import { SecondaryNavController, SecondaryNavList } from "./secondary-nav-list";
import { MainNavLink, TNavLink } from "./main-nav-link";

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
        <nav className="bg-brand-primary-700 text-white text-sm flex px-16">
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
          <nav className="flex self-start justify-between bg-brand-primary text-white px-16">
            <div className="p-2 flex gap-4 self-start items-center">
              <a href="/">
                <SmgSchoolLogo inverse size={100} />
              </a>
              <h2 className="text-2xl font-semibold m-0">
                Saint Maria Goretti Catholic School
              </h2>
            </div>
            <ul className="flex items-stretch text-lg">
              {mainNavLinks.map((m) => {
                return (
                  <li key={m._id}>
                    <MainNavLink link={m} currentPath={urlPath} />
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
