"use server";

import { client } from "@/sanity";
import { SmgSchoolLogo } from "./logo";
import { StickyLogo } from "./sticky-logo";
import Link from "next/link";
import { SecondaryNavController, SecondaryNavList } from "./secondary-nav-list";

export async function TopNavHeader({ path }: { path?: string }) {
  const urlPath = `/${path ?? ""}`;

  const eyebrowLinkClass =
    "px-6 py-2 block hover:bg-brand-primary transition-colors";
  const mainLinkClass =
    "flex relative items-center px-6 transition-colors h-full text-white hover:bg-brand-primary-600";

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

  const mainNavLinks = await client.fetch<
    {
      _id: string;
      page?: {
        title: string;
        slug: { current: string };
      };
      title?: string;
      url?: string;
    }[]
  >(`*[_type == 'mainNavLink' ]{..., page->} | order(order asc)`);

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

        <nav className="flex self-start justify-between bg-brand-primary text-white px-16">
          <div className="p-2 flex gap-4 self-start items-center">
            <a href="/">
              <SmgSchoolLogo inverse size={100} />
            </a>
            <h2 className="text-2xl">Saint Maria Goretti Catholic School</h2>
          </div>
          <ul className="flex items-stretch text-lg">
            {mainNavLinks.map((m) => {
              let href = (m.page ? m.page?.slug.current : m.url) ?? "";
              return (
                <li key={m._id}>
                  <Link
                    data-nav-link={m._id}
                    className={
                      mainLinkClass +
                      (urlPath.startsWith(href || "null")
                        ? " bg-brand-primary-700"
                        : "")
                    }
                    href={href}
                  >
                    {m.title ? m.title : m.page?.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <SecondaryNavController>
          {mainNavLinks.map((m) => (
            <SecondaryNavList key={m._id} navLinkId={m._id} />
          ))}
        </SecondaryNavController>
      </header>
    </>
  );
}
