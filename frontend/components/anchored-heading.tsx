"use server";

import classes from "./anchored-heading.module.css";

const anchorId = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export async function AnchoredHeading(props: {
  style?: string;
  children?: React.ReactNode;
}) {
  const Element = (props.style as keyof JSX.IntrinsicElements) ?? "h2";

  const id = anchorId(props.children?.toString() ?? "");

  return (
    <Element id={id} className={`${classes.anchoredHeading}`}>
      {props.children}
      <a
        href={`#${id}`}
        className={`${classes.anchorLink} pl-2 text-base align-middle transition-opacity no-underline`}
      >
        #
      </a>
    </Element>
  );
}
