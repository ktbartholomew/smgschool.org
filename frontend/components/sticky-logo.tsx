"use client";

import { CSSProperties, useLayoutEffect, useState } from "react";
import { SmgSchoolLogo } from "./logo";

export function StickyLogo() {
  const [stickyStyle, setStickyStyle] = useState<CSSProperties>({
    display: "none",
    top: "-160px",
    transition: "top 0.2s ease-in-out",
  });
  useLayoutEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 160) {
        if (stickyStyle.position !== "sticky") {
          setStickyStyle({
            position: "sticky",
            display: "flex",
            top: "-160px",
            transition: "top 0.2s ease-in-out",
          });

          setTimeout(() => {
            setStickyStyle({
              position: "sticky",
              display: "flex",
              top: "0px",
              transition: "top 0.2s ease-in-out",
            });
          }, 100);
        }
      } else {
        if (stickyStyle.position !== "absolute") {
          setStickyStyle({
            position: "absolute",
            display: "none",
            top: "-160px",
            transition: "top 0.2s ease-in-out",
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [stickyStyle]);

  return (
    <div className="absolute top-0 ml-16 z-30 flex" style={stickyStyle}>
      <a href="#" onClick={() => window.scrollTo(0, 0)}>
        <div className=" bg-brand-primary p-2 shadow-md">
          <SmgSchoolLogo inverse size={100} />
        </div>
      </a>
    </div>
  );
}
