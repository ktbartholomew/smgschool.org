"use server";

import { PageProps } from "@/.next/types/app/[...path]/page";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";

export default async function DynamicPage(props: PageProps) {
  return (
    <>
      <TopNavHeader path={props.params.path} />
      <div className="prose px-16">
        <h1>Parent Resources</h1>
      </div>
      <div
        className="grid p-16 gap-8"
        style={{ gridTemplateColumns: "3fr 1fr" }}
      >
        <div>
          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
            <h3 className="mb-4 text-4xl font-bold">Calendar</h3>
            <iframe
              src="https://calendar.google.com/calendar/u/0/embed?src=en.usa%23holiday@group.v.calendar.google.com&ctz=America/Chicago"
              height={600}
              width="100%"
            ></iframe>
          </div>
        </div>
        <div>
          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
            <div className="prose">
              <h4>Quick Links</h4>
              <ul>
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
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
