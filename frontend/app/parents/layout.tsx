import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import Link from "next/link";

export default function Layout(props: { children: React.ReactNode }) {
  const eyebrowLinkClass =
    "px-6 py-2 block text-white no-underline hover:bg-brand-primary transition-colors";
  return (
    <>
      <TopNavHeader path="/parents" />
      <div className="bg-brand-primary-700 text-white text-sm md:px-16">
        <ul className="m-0 p-0 list-none flex">
          <li>
            <Link href="/parents/documents" className={eyebrowLinkClass}>
              Documents
            </Link>
          </li>
          <li>
            <Link href="/parents/athletics-clubs" className={eyebrowLinkClass}>
              Sports &amp; Clubs
            </Link>
          </li>
          <li>
            <Link href="/parents/volunteer" className={eyebrowLinkClass}>
              Volunteer
            </Link>
          </li>
        </ul>
      </div>
      {props.children}
      <SiteFooter />
    </>
  );
}
