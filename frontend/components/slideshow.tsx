"use client";

import { SanityImageObject } from "@sanity/image-url/lib/types/types";
import { useEffect, useState } from "react";
import { client } from "@/sanity";
import imageUrl from "@sanity/image-url";

export function Slideshow({ images }: { images: SanityImageObject[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 3000);
  }, [activeIndex, images.length]);

  const builder = imageUrl(client);

  return (
    <div className="h-full w-full">
      {images.map((i, idx) => {
        const imageUrl = builder.image(i).url();
        return (
          <div
            className="absolute h-full w-full"
            style={{
              opacity: idx <= activeIndex ? "1" : "0",
              transition: "opacity 0.3s ease-in-out",
            }}
            key={idx}
          >
            <div
              className="absolute h-full w-full bg-cover"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: `${(i.hotspot?.x ?? 0.5) * 100}% ${
                  (i.hotspot?.y ?? 0.5) * 100
                }%`,
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
