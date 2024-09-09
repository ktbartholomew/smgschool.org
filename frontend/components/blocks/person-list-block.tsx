"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import Image from "next/image";
import { Person } from "../section";

const DEFAULT_EMPLOYEE_IMAGE =
  "https://cdn.sanity.io/images/e6jjrj2e/production/b003a206b9ea85383503c721f4c11d6fdfa2d6f2-500x500.jpg";

export default async function PersonListBlock(props: {
  section: { title?: string; people?: Person[] };
}) {
  const builder = imageUrl(client);

  console.log(props);
  return (
    <section className="px-4 py-8 md:px-8 md:text-lg mx-auto">
      {props.section.title ? (
        <h3 className="mb-16 max-w-[1400px] mx-auto">{props.section.title}</h3>
      ) : null}
      <div className="grid gap-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
        {props.section.people?.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-200 rounded-md overflow-hidden hover:drop-shadow-md"
          >
            {p.photo ? (
              <Image
                className="mx-auto w-full"
                alt={p.name}
                src={builder.image(p.photo).width(600).height(600).url()}
                width={600}
                height={600}
              />
            ) : (
              <Image
                className="mx-auto w-full"
                alt={p.name}
                src={DEFAULT_EMPLOYEE_IMAGE}
                width={600}
                height={600}
              />
            )}
            <div className="pb-8 p-4">
              <h5 className="text-xl">{p.name}</h5>
              <div className="mb-4">
                <>{p.position}</>
              </div>
              {p.experience && (
                <div>
                  <em>{p.experience}</em>
                </div>
              )}
              {p.contactEmail && (
                <div>
                  <a href={`mailto:${p.contactEmail}`}>{p.contactEmail}</a>
                </div>
              )}
              {p.contactPhone && <div>{p.contactPhone}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
