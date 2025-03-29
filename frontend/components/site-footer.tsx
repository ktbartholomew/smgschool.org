"use server";

import Link from "next/link";
import { SmgSchoolLogo } from "./logo";
import "./site-footer.css";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { TNavLink } from "./main-nav-link";

const ContactInfo = {
  name: "Saint Maria Goretti Catholic School",
  mapUrl: "https://maps.app.goo.gl/pRNVCy2cNKkBUgQt7",
  address: (
    <>
      1200 S. Davis Drive
      <br />
      Arlington, TX 76013
    </>
  ),
  phone: "817-275-5081",
  email: "secretary@smgschool.org",
};

export default async function SiteFooter() {
  const [eyebrowNavLinks, navLinks] = await Promise.all([
    draftModeClient().fetch<
      {
        _id: string;
        _createdAt: string;
        _updatedAt: string;
        text: string;
        url: string;
        newTab: boolean;
      }[]
    >(`*[_type == 'eyebrowNavLink' ] | order(order asc)`),
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
    <footer className="site-footer p-4 md:p-16">
      <div className="flex flex-wrap gap-8">
        <div className="contact-card flex-grow md:flex-grow-0 md:flex-shrink basis-1 md:basis-1/4 bg-white text-black p-8 rounded-md">
          <div className="flex justify-center mb-8">
            <SmgSchoolLogo />
          </div>
          <p className="mb-2">
            <strong className="text-lg">{ContactInfo.name}</strong>
          </p>
          <address className="not-italic">
            <p className="mb-2">
              <a
                href={ContactInfo.mapUrl}
                target="_blank"
                rel="nofollow noreferrer"
              >
                {ContactInfo.address}
              </a>
            </p>
          </address>
          <p className="mb-2">
            <a href={`tel:+1${ContactInfo.phone.replace(/[^\d]/g, "")}`}>
              {ContactInfo.phone}
            </a>
          </p>
          <p className="mb-0">
            <a href={`mailto:${ContactInfo.email}`}>{ContactInfo.email}</a>
          </p>
        </div>
        <div className="grid flex-grow lg:grid-cols-4 gap-8 gap-y-16">
          {navLinks.map((navLink) => (
            <div key={navLink._id} className="footer-column">
              <h3>
                <Link href={navLink.page?.slug.current ?? "/"}>
                  {navLink.title}
                </Link>
              </h3>
              <ul className="list-none">
                {navLink.secondaryLinks?.map((secondaryLink) => (
                  <li key={secondaryLink._id}>
                    <Link href={secondaryLink.page?.slug.current ?? "/"}>
                      {secondaryLink.title ?? secondaryLink.page?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-column">
            <h3>
              <Link href="/parents">Parent Resources</Link>
            </h3>
            <ul className="list-none">
              {eyebrowNavLinks.map((link, idx) => (
                <li key={link._id}>
                  <Link
                    href={link.url}
                    target={link.newTab ? "_blank" : "_self"}
                    rel={link.newTab ? "nofollow noreferrer" : ""}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
