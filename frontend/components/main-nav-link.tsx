"use client";

import Link from "next/link";
import "./main-nav-link.css";

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
    <li className="main-nav-link m-0 py-4 md:py-0">
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
      <ul
        className={
          " text-white text-base md:absolute md:z-30 md:bg-brand-primary-600 m-0 list-none p-0"
        }
      >
        {link.secondaryLinks?.map((slink, idx) => {
          const title = slink.page?.title ?? slink.title;
          const href =
            (slink.page ? slink.page?.slug.current : slink.url) ?? "";
          return (
            <li key={idx}>
              <Link
                className="block p-4 text-white no-underline hover:underline"
                href={href}
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
