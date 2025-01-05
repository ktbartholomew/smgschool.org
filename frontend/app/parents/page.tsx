"use server";

import { PortableTextWithAddons } from "@/components/portable-text-with-addons";
import { PUBLIC_CALENDAR_URL } from "@/lib/calendar";
import { draftModeClient } from "@/lib/sanity/draft-mode-client";
import { dateToCentralTime } from "@/lib/time";
import { PortableTextBlock } from "next-sanity";
import Link from "next/link";

export default async function ParentResourcesPage() {
  const today = new Date();
  const volunteerNeeds = await draftModeClient().fetch<
    {
      _id: string;
      title: string;
      date: string;
      shortDescription?: string;
      signupUrl: string;
    }[]
  >(
    `*[_type == 'volunteerNeed' && date > '${today.toISOString()}' ] | order(date asc)`
  );

  const documents = await draftModeClient().fetch<
    {
      _id: string;
      title: string;
      documentUrl: string;
    }[]
  >(
    `*[_type == 'parentDocument'] | order(title desc) {
  _id,
  title,
  "documentUrl": document.asset->url
}`
  );

  const parentNews = await draftModeClient().fetch<
    {
      _id: string;
      title: string;
      date: string;
      content: PortableTextBlock[];
    }[]
  >(`*[_type == 'parentNews'] | order(date desc)`);

  return (
    <>
      <div className="prose px-4 md:px-16">
        <h1>Parent Resources</h1>
      </div>
      <div className="grid p-4 md:p-8 gap-8 grid-cols-1 md:grid-cols-[3fr_1fr]">
        <div>
          {parentNews.map((n) => {
            return (
              <div
                key={n._id}
                className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8"
              >
                <article className="prose">
                  <header className="mb-4">
                    <h3 className="my-0">{n.title}</h3>
                    <span>
                      {dateToCentralTime(n.date).toLocaleDateString()}
                    </span>
                  </header>
                  <PortableTextWithAddons value={n.content.slice(0, 1)} />
                  <Link href={`/parents/news/${n._id}`}>Read more</Link>
                </article>
              </div>
            );
          })}
          <div className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8">
            <h3 className="mt-0 mb-4 text-4xl font-bold">Calendar</h3>
            <iframe
              src={PUBLIC_CALENDAR_URL}
              height={600}
              width="100%"
            ></iframe>
          </div>
        </div>
        <div>
          <div className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8">
            <a href="https://familyportal.renweb.com/" target="_blank">
              <button className="bg-sky-500 hover:bg-sky-600 text-white transition-colors py-2 px-8 block w-full rounded-md">
                Log in to RenWeb
              </button>
            </a>
          </div>

          <div className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8">
            <div className="prose">
              <h4>Volunteer</h4>
            </div>
            {volunteerNeeds.length === 0 && (
              <p>
                <em>No upcoming volunteer needs</em>
              </p>
            )}
            <ul>
              {volunteerNeeds.map((v) => {
                return (
                  <li key={v._id} className="mb-4">
                    <div>
                      <strong>{v.title}</strong>:{" "}
                      {dateToCentralTime(v.date).toLocaleDateString()}
                    </div>
                    {v.shortDescription && (
                      <div className="text-sm mb-2">{v.shortDescription}</div>
                    )}
                    <div>
                      <a href={v.signupUrl} target="_blank">
                        <button className="text-sm bg-sky-500 hover:bg-sky-600 text-white transition-colors py-1 px-4 rounded-md">
                          Sign up
                        </button>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8">
            <div className="prose">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <a href="/">Summer Reading Lists</a>
                </li>
                <li>
                  <a href="/">Buy School Supplies</a>
                </li>
                <li>
                  <a href="/">Volunteer Needs</a>
                </li>
                <li>
                  <a href="/">Latest Newsletter</a>
                </li>
                <li>
                  <a href="/">Log in to RenWeb</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border border-slate-300 shadow-md rounded-md p-4 md:p-8 mb-8">
            <div className="prose">
              <h4>Documents</h4>
              <ul>
                {documents.map((d) => (
                  <li key={d._id}>
                    <a href={d.documentUrl} target="_blank">
                      {d.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
