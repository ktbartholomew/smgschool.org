import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";
import {
  SanityImageObject,
  SanityImageSource,
} from "@sanity/image-url/lib/types/types";

export default async function HeroBlock(props: {
  section: {
    _key: string;
    image?: SanityImageSource & SanityImageObject;
    title?: string;
  };
}) {
  const builder = imageUrl(client);

  return (
    <section className="relative" style={{ height: "50vh" }}>
      <div
        className="absolute h-full w-full bg-cover"
        style={{
          backgroundImage: props.section.image
            ? `url(${builder.image(props.section.image).url()})`
            : "",
          backgroundPosition: `${
            (props.section.image?.hotspot?.x ?? 0.5) * 100
          }% ${(props.section.image?.hotspot?.y ?? 0.5) * 100}%`,
        }}
      ></div>
      <div className="absolute h-full w-full bg-brand-primary-700/80 mix-blend-multiply"></div>
      <div className="absolute h-full w-full flex items-center justify-center">
        <h1 className="font-black text-center text-white tracking-tight text-8xl text-balance drop-shadow-lg-strong mb-8 z-20">
          {props.section.title}
        </h1>
      </div>
    </section>
  );
}
