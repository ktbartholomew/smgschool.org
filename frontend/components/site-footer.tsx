"use server";

import Link from "next/link";
import { SmgSchoolLogo } from "./logo";
import "./site-footer.css";

export default async function SiteFooter() {
  return (
    <footer className="site-footer p-4 md:p-16">
      <div className="flex flex-wrap gap-8">
        <div className="contact-card flex-grow md:flex-grow-0 md:flex-shrink basis-1 md:basis-1/4 bg-white text-black p-8 rounded-md">
          <div className="flex justify-center mb-8">
            <SmgSchoolLogo />
          </div>
          <p className="mb-2">
            <strong className="text-lg">
              Saint Maria Goretti Catholic School
            </strong>
          </p>
          <address>
            <p className="mb-2">
              <a
                href="https://maps.app.goo.gl/pRNVCy2cNKkBUgQt7"
                target="_blank"
                rel="nofollow noreferrer"
              >
                1200 S. Davis Drive
                <br /> Arlington, TX 76013
              </a>
            </p>
            <p className="mb-2">
              <a href="tel:+18172755081">817-275-5081</a>
            </p>
            <p className="mb-0">
              <a href="mailto:secretary@smgschool.org">
                secretary@smgschool.org
              </a>
            </p>
          </address>
        </div>
        <div className="grid flex-grow lg:grid-cols-4 gap-8 gap-y-16">
          <div className="footer-column">
            <h3>
              <Link href="/about">About</Link>
            </h3>
            <ul className="list-none">
              <li>
                <Link href="/about/faculty-and-staff">Faculty & Staff</Link>
              </li>
              <li>
                <Link href="/about/employment">Employment</Link>
              </li>
              <li>
                <Link href="/about/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>
              <Link href="/admissions">Admissions</Link>
            </h3>
            <ul className="list-none">
              <li>
                <Link href="/admissions/tour">Schedule a Tour</Link>
              </li>
              <li>
                <Link href="/admissions/process">Enrollment Process</Link>
              </li>
              <li>
                <Link href="/admissions/apply">Apply Today</Link>
              </li>
              <li>
                <Link href="/admissions/financial-aid">Financial Aid</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>
              <Link href="/academics">Academics</Link>
            </h3>
            <ul className="list-none">
              <li>
                <Link href="/academics/programs">Programs</Link>
              </li>
              <li>
                <Link href="/academics/classical-education">
                  Classical Education
                </Link>
              </li>
              <li>
                <Link href="/academics/faith-families">Faith Families</Link>
              </li>
              <li>
                <Link href="/academics/extracurriculars">Extracurriculars</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>
              <Link href="/support-us">Support Us</Link>
            </h3>
            <ul className="list-none">
              <li>
                <Link href="/support-us/volunteer">Volunteer</Link>
              </li>
              <li>
                <Link href="/support/donate">Donate</Link>
              </li>
              <li>
                <Link href="/support/sponsors">Our Sponsors</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Parents</h3>
            <ul className="list-none">
              <li>
                <Link
                  href="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FChicago"
                  target="_blank"
                >
                  Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="https://secure.smore.com/n/qtxs7-the-trojan-times"
                  target="_blank"
                >
                  Weekly Newsletter
                </Link>
              </li>
              <li>
                <Link href="https://familyportal.renweb.com/" target="_blank">
                  RenWeb
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
