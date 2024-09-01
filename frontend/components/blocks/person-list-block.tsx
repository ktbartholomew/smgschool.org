"use server";

export default async function PersonListBlock(props: {
  section: { title?: string; people: {}[] };
}) {
  return (
    <section className="prose px-4 py-8 md:px-8 md:text-lg max-w-prose mx-auto">
      {props.section.title ? <h3>{props.section.title}</h3> : null}
    </section>
  );
}
