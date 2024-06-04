"use server";

import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";

export default async function HeroBlock(props: {
  section: {
    _key: string;
    title?: string;
    image?: SanityImageSource & SanityImageObject;
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
    ? builder.image(props.section.image).format("webp").url()
    : "";

  if (props.section.blurImage) {
    backgroundImageUrl = props.section.image
      ? builder.image(props.section.image).format("webp").blur(100).url()
      : "";
  }

  return (
    <section className="relative" style={{ height: "50vh" }}>
      <div
        className={
          props.section.image
            ? "absolute h-full w-full bg-cover"
            : "absolute h-full w-full"
        }
        style={{
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : undefined,
          background: backgroundImageUrl
            ? undefined
            : "radial-gradient(rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 100%) 50% 50%/100% 100% no-repeat, url('/smgschool-tartan.svg') 50% 50%/128px 128px repeat",
          backgroundPosition: `${
            (props.section.image?.hotspot?.x ?? 0.5) * 100
          }% ${(props.section.image?.hotspot?.y ?? 0.5) * 100}%`,
        }}
      ></div>
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
