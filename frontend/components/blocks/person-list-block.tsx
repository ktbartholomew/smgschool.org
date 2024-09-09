"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import Image from "next/image";
import { Person } from "../section";

const DEFAULT_EMPLOYEE_IMAGE =
  "https://cdn.sanity.io/images/e6jjrj2e/production/b003a206b9ea85383503c721f4c11d6fdfa2d6f2-500x500.jpg";

export default async function PersonListBlock(props: {
  section: {
    title?: string;
    people?: { alternateTitle?: string; person: Person }[];
  };
}) {
  const builder = imageUrl(client);

  return (
    <section className="px-4 py-8 md:px-8 md:text-lg mx-auto">
      {props.section.title ? (
        <h3 className="mb-16 max-w-[1400px] mx-auto">{props.section.title}</h3>
      ) : null}
      <div className="grid gap-4 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-[1400px] mx-auto">
        {props.section.people?.map((p) => {
          const { person } = p;
          return (
            <div
              key={person._id}
              className="bg-white border border-gray-200 rounded-md overflow-hidden hover:drop-shadow-md"
            >
              {person.photo ? (
                <Image
                  className="mx-auto w-full"
                  alt={person.name}
                  src={builder.image(person.photo).width(600).height(600).url()}
                  width={600}
                  height={600}
                />
              ) : (
                <Image
                  className="mx-auto w-full"
                  alt={person.name}
                  src={DEFAULT_EMPLOYEE_IMAGE}
                  width={600}
                  height={600}
                />
              )}
              <div className="pb-8 p-4">
                <h5 className="text-xl">{person.name}</h5>
                <div className="mb-4">
                  <>{p.alternateTitle ?? person.position}</>
                </div>
                {person.experience && (
                  <div>
                    <em>{person.experience}</em>
                  </div>
                )}
                {person.contactEmail && (
                  <div>
                    <a href={`mailto:${person.contactEmail}`}>
                      {person.contactEmail}
                    </a>
                  </div>
                )}
                {person.contactPhone && (
                  <div>
                    <a href={`tel:${person.contactPhone}`}>
                      {person.contactPhone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
