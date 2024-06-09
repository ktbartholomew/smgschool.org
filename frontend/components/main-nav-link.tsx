"use client";

import Link from "next/link";

const mainLinkClass =
  "flex relative items-center md:px-6 transition-colors h-full text-white no-underline md:hover:bg-brand-primary-600";

export type TNavLink = {
  _id: string;
  title?: string;
  url?: string;
  page?: {
    title: string;
    slug: { current: string };
  };
  secondaryLinks: {
    _id: string;
    title?: string;
    url?: string;
    page?: {
      title: string;
      slug: { current: string };
    };
  }[];
};

export function MainNavLink({
  currentPath,
  link,
}: {
  currentPath: string;
  link: TNavLink;
}) {
  const href = (link.page ? link.page?.slug.current : link.url) ?? "";

  return (
    <>
      <li className="py-4 md:py-0">
        <Link
          data-nav-link={link._id}
          className={
            mainLinkClass +
            (currentPath.startsWith(href || "null")
              ? " md:bg-brand-primary-600"
              : "")
          }
          href={href}
        >
          {link.title ? link.title : link.page?.title}
        </Link>
        <ul className="md:hidden text-white text-base md:absolute md:z-30 md:bg-brand-primary-600 ">
          {link.secondaryLinks?.map((slink) => {
            const href =
              (slink.page ? slink.page?.slug.current : slink.url) ?? "";
            return (
              <li key={slink._id}>
                <Link
                  className="block p-4 text-white no-underline hover:underline"
                  href={href}
                >
                  {slink.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    </>
  );
}
