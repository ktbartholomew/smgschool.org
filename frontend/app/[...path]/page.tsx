"use server";

import { PageProps } from "@/.next/types/app/[...path]/page";
import { TopNavHeader } from "@/components/header";
import { client } from "@/sanity";
import { notFound } from "next/navigation";

export default async function DynamicPage(props: PageProps) {
  const pages = await client.fetch(
    `*[_type == 'page' && slug.current == '/${props.params.path.join("/")}']`
  );

  if (pages.length === 0) {
    return notFound();
  }

  const page = pages[0];

  return (
    <>
      <TopNavHeader path={props.params.path} />
      <main>
        <pre>
          <code>{JSON.stringify(page, null, 2)}</code>
        </pre>
      </main>
    </>
  );
}
