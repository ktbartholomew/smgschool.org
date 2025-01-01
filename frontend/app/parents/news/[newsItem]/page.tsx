"use server";

import { PageProps } from "@/.next/types/app/parents/news/[newsItem]/page";
import { PortableTextWithAddons } from "@/components/portable-text-with-addons";
import { dateToCentralTime } from "@/lib/time";
import { client } from "@/sanity";
import Link from "next/link";

export default async function ParentNewsItemPage(props: PageProps) {
  const newsItems = await client.fetch(
    `
        *[_type == 'parentNews' && _id == $id]
        `,
    { id: props.params.newsItem }
  );

  const newsItem = newsItems[0];

  return (
    <>
      <article className="prose px-4 md:px-16 max-w-prose mx-auto mb-16">
        <div className="my-4">
          <Link href="/parents">Back to Parent Resources</Link>
        </div>
        <header>
          <h1 className="mb-2 text-5xl">{newsItem.title}</h1>
          <span>{dateToCentralTime(newsItem.date).toLocaleDateString()}</span>
        </header>
        <div>
          <PortableTextWithAddons value={newsItem.content} />
        </div>
      </article>
    </>
  );
}
