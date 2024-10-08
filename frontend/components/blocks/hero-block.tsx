"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";
import { LazyHeroImage } from "../lazy-hero-image";
import { Slideshow } from "../slideshow";

export default async function HeroBlock(props: {
  section: {
    _key: string;
    title?: string;
    cta?: { _key: string; label: string; link: string }[];
    image?: SanityImageSource & SanityImageObject & { lqip?: string };
    images?: (SanityImageSource & SanityImageObject & { lqip?: string })[];
    blurImage?: boolean;
    colorOverlay?: string;
  };
  className?: string;
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
    <section className={"relative " + (props.className ?? "")}>
      {/* Single image with lazy-load helpers */}
      {props.section.image && !props.section.images ? (
        <LazyHeroImage
          imageUrl={backgroundImageUrl}
          placeholderUrl={props.section.image?.lqip}
          hotspot={props.section.image?.hotspot}
        />
      ) : null}

      {/* Slideshow */}
      {props.section.images ? (
        <div className="absolute h-full w-full">
          <Slideshow images={props.section.images} />
        </div>
      ) : null}

      {/* Tartan pattern */}
      {!props.section.image && !props.section.images ? (
        <LazyHeroImage imageUrl={""} />
      ) : null}
      <div
        className={`absolute h-full w-full ${colorOverlayClass} mix-blend-multiply`}
      ></div>
      <div className="absolute h-full w-full flex flex-wrap items-center content-center gap-8 justify-center">
        <h1 className="font-black text-center text-white tracking-tight text-5xl md:text-8xl text-balance drop-shadow-lg-strong  z-20">
          {props.section.title}
        </h1>
        <div>
          {props.section.cta?.map((cta) => (
            <a key={cta._key} href={cta.link}>
              <button className="text-2xl bg-brand-primary text-white shadow-lg px-8 py-4 rounded-md">
                {cta.label}
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
