"use client";

import { useEffect, useState } from "react";

export function LazyHeroImage(props: {
  imageUrl: string;
  placeholderUrl?: string;
  hotspot?: { x?: number; y?: number };
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!props.imageUrl) {
      return;
    }

    const i = new Image();
    i.onload = () => setImageLoaded(true);
    i.src = props.imageUrl;
  }, [props.imageUrl]);

  return (
    <>
      {/* The full-size image */}

      <div
        className={
          props.imageUrl
            ? "absolute h-full w-full bg-cover"
            : "absolute h-full w-full"
        }
        style={{
          backgroundImage:
            props.imageUrl && imageLoaded
              ? `url(${props.imageUrl})`
              : undefined,
          background: props.imageUrl
            ? undefined
            : "radial-gradient(rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 100%) 50% 50%/100% 100% no-repeat, url('/smgschool-tartan.svg') 50% 50%/128px 128px repeat",
          backgroundPosition: `${(props.hotspot?.x ?? 0.5) * 100}% ${
            (props.hotspot?.y ?? 0.5) * 100
          }%`,
        }}
      ></div>

      {/* The placeholder */}
      {props.imageUrl && (
        <div
          className={
            props.imageUrl
              ? "absolute h-full w-full transition-opacity bg-cover"
              : "absolute h-full w-full transition-opacity"
          }
          style={{
            opacity: imageLoaded ? 0 : 1,
            backgroundImage: `url('${props.placeholderUrl}')`,
            backgroundPosition: `${(props.hotspot?.x ?? 0.5) * 100}% ${
              (props.hotspot?.y ?? 0.5) * 100
            }%`,
          }}
        ></div>
      )}
    </>
  );
}
