"use client";

import { SmgSchoolLogo } from "./logo";
import Link from "next/link";
import { MainNavLink, TEyebrowLink, TNavLink } from "./main-nav-link";
import HamburgerIcon from "./hamburger-icon";
import { useEffect, useState } from "react";
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/constants";
import { InstagramIcon } from "./instagram";
import { FacebookIcon } from "./facebook";

export function MainNavList(props: {
  urlPath?: string;
  eyebrowLinks: TEyebrowLink[];
  links: TNavLink[];
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [props.urlPath]);

  const eyebrowLinkClass =
    "px-6 py-2 block text-white no-underline hover:bg-brand-primary transition-colors";

  return (
    <>
      <nav className="hidden md:flex bg-brand-primary-700 text-white text-sm md:px-16">
        <ul className="flex items-center list-none m-0">
          {props.eyebrowLinks.map((l) => (
            <li key={l._id} className="m-0">
              <Link
                className={eyebrowLinkClass}
                href={l.url}
                target={l.newTab ? "_blank" : "_self"}
              >
                {l.text}
              </Link>
            </li>
          ))}
          <li className="m-0">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              className={eyebrowLinkClass}
            >
              <InstagramIcon />
            </Link>
          </li>
          <li className="m-0">
            <Link
              href={FACEBOOK_URL}
              target="_blank"
              className={eyebrowLinkClass}
            >
              <FacebookIcon />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="flex items-stretch justify-between md:justify-between bg-brand-primary text-white md:px-16">
        <button
          className="md:hidden text-3xl p-4"
          onClick={() => setShow(true)}
        >
          <HamburgerIcon />
        </button>
        <div className="flex gap-4 items-center p-2">
          <Link href="/">
            {/* Alternatively, we could render a single logo and make its size media-query-aware */}
            <SmgSchoolLogo className="md:hidden" inverse size={64} />
            <SmgSchoolLogo className="hidden md:block" inverse size={100} />
          </Link>
          <h2 className="text-2xl font-semibold m-0 hidden lg:block text-balance">
            Saint Maria Goretti Catholic School
          </h2>
        </div>

        <div className="w-[64px] md:hidden">
          {/* A dummy div to balance the flexbox layout */}
        </div>
        <div
          className={`${
            show ? "block" : "hidden"
          } fixed top-0 left-0 w-[100vh] h-[100vh] overflow-scroll z-50 md:static md:w-auto md:h-auto md:overflow-hidden md:flex md:z-auto bg-brand-primary items-stretch text-xl md:text-lg`}
        >
          <button
            className="md:hidden h-[80px] text-3xl p-4"
            onClick={() => setShow(false)}
          >
            <HamburgerIcon />
          </button>
          <ul className="md:hidden bg-brand-primary-700 text-base list-none m-0">
            {props.eyebrowLinks.map((l) => (
              <li key={l._id} className="m-0">
                <Link
                  className={eyebrowLinkClass}
                  href={l.url}
                  target={l.newTab ? "_blank" : "_self"}
                >
                  {l.text}
                </Link>
              </li>
            ))}
            <li className="m-0">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                className={eyebrowLinkClass}
              >
                <InstagramIcon />
              </Link>
            </li>
            <li className="m-0">
              <Link
                href={FACEBOOK_URL}
                target="_blank"
                className={eyebrowLinkClass}
              >
                <FacebookIcon />
              </Link>
            </li>
          </ul>

          <ul className="md:flex items-stretch text-xl md:text-lg ml-4 md:ml-0 md:px-4 list-none m-0 pb-24 md:pb-0">
            {props.links.map((m) => {
              return (
                <MainNavLink
                  key={m._id}
                  link={m}
                  currentPath={props.urlPath ?? ""}
                />
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
