"use server";

import HeroBlock from "@/components/blocks/hero-block";
import { LazyHeroImage } from "@/components/lazy-hero-image";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { client } from "@/sanity";
import Link from "next/link";

export default async function Home() {
  const page = (
    await client.fetch(`*[_type == 'page' && slug.current == '/_home']`)
  )[0];

  return (
    <>
      <TopNavHeader />
      <main className="">
        <HeroBlock section={page.sections[0]} className="h-[80vh]" />
        <div className="px-4 py-16 md:py-32 md:px-16">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-black tracking-tight text-3xl md:text-8xl text-balance mb-8">
                70 Years of Excellence
              </h2>
              <p className="text-xl md:text-2xl mb-8">
                Saint Maria Goretti Catholic School is the leader in Catholic
                education in D/FW. Since being founded by the sisters of St.
                Mary of Namur in 1954, SMG has been at the center of Catholic
                life in Arlington.
              </p>
              <div>
                <Link className="text-2xl underline text-sky-600" href="/about">
                  Learn more about SMG
                </Link>
              </div>
            </div>
            <div>
              <img src="/ai-students-04.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className="h-[80vh] relative">
          <div className="overflow-hidden">
            <img
              className="absolute block h-full w-full object-cover object-center -z-20"
              src="https://cdn.sanity.io/images/e6jjrj2e/production/d2f4c9e278ccd580284e141b325f4bdc417123fa-3000x2000.jpg?w=1800&auto=format"
              alt="middle school class"
            />
            <div className="absolute h-full w-full bg-brand-primary-700/80 mix-blend-multiply"></div>
          </div>
          <div className="relative pt-[20vh] px-16 text-center">
            <h2 className="font-black text-center text-white tracking-tight text-3xl md:text-8xl text-balance drop-shadow-lg-strong mb-8 z-20">
              Education that defies labels
            </h2>
            <p className="text-2xl mb-8 text-white text-center drop-shadow-lg-strong mx-auto max-w-prose">
              We’re not just a private school. We’re not just classical
              education. We’re not just Catholic education. Saint Maria Goretti
              is all of the above; a combination of faith, family, and community
              that you won’t find anywhere else.
            </p>
            <div>
              <Link
                className="inline-block px-8 py-4 rounded-md text-2xl bg-white text-black"
                href="/academics"
              >
                Learn more about our academics
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
