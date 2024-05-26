"use client";

import { useContext } from "react";
import { SecondaryNavContext } from "./secondary-nav-list";
import Link from "next/link";

const mainLinkClass =
  "flex relative items-center px-6 transition-colors h-full text-white hover:bg-brand-primary-600";

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
  const navContext = useContext(SecondaryNavContext);
  const href = (link.page ? link.page?.slug.current : link.url) ?? "";

  return (
    <>
      <Link
        data-nav-link={link._id}
        className={
          mainLinkClass +
          (navContext.active === link._id ||
          currentPath.startsWith(href || "null")
            ? " bg-brand-primary-600"
            : "")
        }
        href={href}
      >
        {link.title ? link.title : link.page?.title}
      </Link>
    </>
  );
}
