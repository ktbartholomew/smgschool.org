"use server";

import { PortableText, PortableTextBlock } from "@portabletext/react";
import { PortableTextWithAddons } from "../portable-text-with-addons";

export default async function TwoColumnHeroBlock(props: {
  section: { column1: PortableTextBlock[]; column2: PortableTextBlock[] };
  className?: string;
}) {
  const onlyImageColumn1 =
    props.section.column1?.length === 1 &&
    props.section.column1[0]._type === "image";

  const onlyImageColumn2 =
    props.section.column2?.length === 1 &&
    props.section.column2[0]._type === "image";

  const proseColumnClasses = "p-8";

  return (
    <section className={`prose hero ${props.className ? props.className : ""}`}>
      <div className="grid md:grid-cols-2 items-stretch">
        <div className={onlyImageColumn1 ? "" : proseColumnClasses}>
          <PortableTextWithAddons value={props.section.column1} />
        </div>
        <div>
          <div className={onlyImageColumn2 ? "" : proseColumnClasses}>
            <PortableTextWithAddons value={props.section.column2} />
          </div>
        </div>
      </div>
    </section>
  );
}
