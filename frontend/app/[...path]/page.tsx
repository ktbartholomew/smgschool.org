"use server";

import { PageProps } from "@/.next/types/app/[...path]/page";
import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";
import { client } from "@/sanity";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

export default async function DynamicPage(props: PageProps) {
  const pages = await client.fetch<
    {
      _id: string;
      title: string;
      sections: {
        title?: string;
        _key: string;
        content: any[];
      }[];
    }[]
  >(`*[_type == 'page' && slug.current == '/${props.params.path.join("/")}']`);

  if (pages.length === 0) {
    return notFound();
  }

  const page = pages[0];

  return (
    <>
      <TopNavHeader path={props.params.path} />
      <main>
        {page.sections.map((s) => (
          <section key={s._key} className="p-8 text-lg max-w-prose mx-auto">
            <PortableText value={s.content} />
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
