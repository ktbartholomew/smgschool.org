"use client";

import { SmgSchoolLogo } from "./logo";
import Link from "next/link";
import { MainNavLink, TNavLink } from "./main-nav-link";
import HamburgerIcon from "./hamburger-icon";
import { useEffect, useState } from "react";

export function MainNavList(props: { urlPath?: string; links: TNavLink[] }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [props.urlPath]);

  return (
    <>
      <nav className="flex items-stretch justify-between md:justify-between bg-brand-primary text-white md:px-16">
        <button
          className="md:hidden text-3xl p-4"
          onClick={() => setShow(true)}
        >
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
          <ul className="md:flex items-stretch text-xl md:text-lg px-4 ">
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
