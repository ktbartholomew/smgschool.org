"use server";

import Button from "@/components/button";
import { PortableTextWithAddons } from "@/components/portable-text-with-addons";
import {
  LUNCH_MENU_URL,
  NEWSLETTER_URL,
  PUBLIC_CALENDAR_URL,
  RENWEB_URL,
  UNIFORMS_URL,
} from "@/lib/constants";
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
                  <div className="mt-4">
                    <Link href={`/parents/news/${n._id}`}>Read more</Link>
                  </div>
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
            <Button className="w-full" href={RENWEB_URL} target="_blank">
              Log in to RenWeb
            </Button>
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
              {volunteerNeeds
                .filter((v, idx) => idx < 5)
                .map((v) => {
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
                  <Link href={RENWEB_URL} target="_blank">
                    Log in to RenWeb
                  </Link>
                </li>
                <li>
                  <Link href={LUNCH_MENU_URL}>Lunch Menu</Link>
                </li>
                <li>
                  <Link href={UNIFORMS_URL}>Buy School Uniforms</Link>
                </li>
                <li>
                  <Link href={NEWSLETTER_URL}>Latest Newsletter</Link>
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
