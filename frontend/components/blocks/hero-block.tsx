"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { LazyHeroImage } from "../lazy-hero-image";

export default async function HeroBlock(props: {
  section: {
    _key: string;
    title?: string;
    image?: SanityImageSource & SanityImageObject & { lqip?: string };
    blurImage?: boolean;
    colorOverlay?: string;
  };
}) {
  const builder = imageUrl(client);

  let colorOverlayClass = "";
  switch (props.section.colorOverlay) {
    case "Dark Red":
      colorOverlayClass = "bg-brand-primary-700/80";
      break;
    case "Navy Blue":
      colorOverlayClass = "bg-slate-900/80";
      break;
    case "Gold":
      colorOverlayClass = "bg-brand-secondary/80";
      break;
  }

  let backgroundImageUrl = props.section.image
    ? builder.image(props.section.image).format("webp").width(2000).url()
    : "";

  if (props.section.blurImage) {
    backgroundImageUrl = props.section.image
      ? builder.image(props.section.image).format("webp").blur(100).url()
      : "";
  }

  return (
    <section className="relative" style={{ height: "50vh" }}>
      <LazyHeroImage
        imageUrl={backgroundImageUrl}
        placeholderUrl={props.section.image?.lqip}
        hotspot={props.section.image?.hotspot}
      />
      <div
        className={`absolute h-full w-full ${colorOverlayClass} mix-blend-multiply`}
      ></div>
      <div className="absolute h-full w-full flex items-center justify-center">
        <h1 className="font-black text-center text-white tracking-tight text-5xl md:text-8xl text-balance drop-shadow-lg-strong mb-8 z-20">
          {props.section.title}
        </h1>
      </div>
    </section>
  );
}
