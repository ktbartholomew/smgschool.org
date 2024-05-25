"use server";

import { TopNavHeader } from "@/components/header";
import { client } from "@/sanity";
import Link from "next/link";

export default async function Home() {
  const page = await client.fetch(
    `*[_type == 'page' && slug.current == '_home']`
  );

  return (
    <>
      <TopNavHeader />
      <main className="">
        <div className="hero relative h-[80vh] overflow-hidden">
          <img
            src="/ai-students-01.jpg"
            className="object-cover block object-center"
          />
          <div className="eyebrow z-20 mt-8 flex justify-center absolute top-0 w-full">
            <div className="bg-brand-secondary text-black py-2 px-8 rounded-md drop-shadow-md">
              Enrollment for the 2024-2025 school year is now open!{" "}
              <a href="/" className="underline">
                Enroll now
              </a>
            </div>
          </div>
          <div className="caption z-10 flex items-center justify-center absolute top-0 w-full h-full">
            <div className="text-center text-8xl tracking-tight font-black text-white text-balance drop-shadow-lg-strong">
              Teaching Tomorrow’s Faithful Leaders
            </div>
          </div>
        </div>
        <div className="py-32 px-16">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-black trackin-tight text-8xl text-balance mb-8">
                70 Years of Excellence
              </h2>
              <p className="text-2xl mb-4">
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
        <pre>
          <code>{JSON.stringify(page, null, 2)}</code>
        </pre>
      </main>
    </>
  );
}
