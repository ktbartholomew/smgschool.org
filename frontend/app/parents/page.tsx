"use server";

import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { client } from "@/sanity";

export default async function ParentResourcesPage() {
  const volunteerNeeds = await client.fetch<
    {
      _id: string;
      title: string;
      date: string;
      shortDescription?: string;
      signupUrl: string;
    }[]
  >(`*[_type == 'volunteerNeed' && date > '2024-06-04' ] | order(date asc)`);

  return (
    <>
      <TopNavHeader path="/parents" />
      <div className="prose px-16">
        <h1>Parent Resources</h1>
      </div>
      <div
        className="grid p-16 gap-8"
        style={{ gridTemplateColumns: "3fr 1fr" }}
      >
        <div>
          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
            <div className="prose">
              <h3>Summer Info</h3>
              <p>
                We hope you and your family have a fun and relaxing summer!
                Here’s some need-to-know information to keep in mind before
                school starts again:
              </p>
              <h4>Summer Readings Lists</h4>
              <p>All students have required reading over the summer.</p>
              <ul>
                <li>
                  <a href="https://files.ecatholic.com/12396/documents/2024/5/PreK%20summer%20reading%20format.pdf?t=1716394244000">
                    Pre-K Reading List
                  </a>
                </li>
                <li>
                  <a href="https://files.ecatholic.com/12396/documents/2024/5/PreK%20summer%20reading%20format.pdf?t=1716394244000">
                    Kindergarten Reading List
                  </a>
                </li>
                <li>
                  <a href="https://files.ecatholic.com/12396/documents/2024/5/PreK%20summer%20reading%20format.pdf?t=1716394244000">
                    First Grade Reading List
                  </a>
                </li>
                <li>
                  <a href="https://files.ecatholic.com/12396/documents/2024/5/PreK%20summer%20reading%20format.pdf?t=1716394244000">
                    Second Grade Reading List
                  </a>
                </li>
              </ul>
              <h4>School Supplies</h4>
              <p>
                Unlike last year, you need to buy your own school supplies this
                year. You still have the option to{" "}
                <a href="https://schoolsuppliesco.com/collections/st-maria-goretti">
                  buy all of the supplies in a single package from School
                  Supplies Co.
                </a>
              </p>
            </div>
          </div>
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
            <a href="https://familyportal.renweb.com/">
              <button className="bg-sky-500 hover:bg-sky-600 text-white transition-colors py-2 px-8 block w-full rounded-md">
                Log in to RenWeb
              </button>
            </a>
          </div>

          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
            <div className="prose">
              <h4>Volunteer</h4>
            </div>
            <ul>
              {volunteerNeeds.map((v) => {
                return (
                  <li key={v._id} className="mb-4">
                    <div>
                      <strong>{v.title}</strong>:{" "}
                      {new Date(v.date).toLocaleDateString()}
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
          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
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
          <div className="border border-slate-300 shadow-md rounded-md p-8 mb-8">
            <div className="prose">
              <h4>Documents</h4>
              <ul>
                <li>
                  <a href="/">2024-2025 School Calendar</a>
                </li>
                <li>
                  <a href="/">2024-2025 School Handbook</a>
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
