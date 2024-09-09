"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import Image from "next/image";
import { Person } from "../section";

export default async function PersonListBlock(props: {
  section: { title?: string; people?: Person[] };
}) {
  const builder = imageUrl(client);

  console.log(props);
  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg mx-auto">
      {props.section.title ? (
        <h3 className="mb-8">{props.section.title}</h3>
      ) : null}
      <div className="grid gap-4 gap-y-8 md:grid-cols-3">
        {props.section.people?.map((p) => (
          <div key={p._id}>
            {p.photo && (
              <Image
                alt={p.name}
                src={builder.image(p.photo).width(300).url()}
                width={300}
                height={300}
              />
            )}
            <h5 className="text-2xl">{p.name}</h5>
            <div>
              <strong>{p.position}</strong>
            </div>
            <div>
              <em>{p.experience}</em>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
