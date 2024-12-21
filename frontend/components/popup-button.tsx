"use client";

import { MouseEvent } from "react";

export function PopupButton(props: { text: string; href: string }) {
  function showPopupWindow(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (!document) return;

    const url = e.currentTarget?.getAttribute("data-url");
    const title = "Square Payment Links";

    // Some platforms embed in an iframe, so we want to top window to calculate sizes correctly
    const topWindow = window.top ? window.top : window;

    // Most browsers use screenLeft and screenTop, but Firefox uses screenX and screenY
    const dualScreenLeft =
      topWindow.screenLeft !== undefined
        ? topWindow.screenLeft
        : topWindow.screenX;
    const dualScreenTop =
      topWindow.screenTop !== undefined
        ? topWindow.screenTop
        : topWindow.screenY;

    const width = topWindow.innerWidth
      ? topWindow.innerWidth
      : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    const height = topWindow.innerHeight
      ? topWindow.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

    const h = height * 0.75;
    const w = 500;

    const systemZoom = width / topWindow.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url as string,
      title,
      `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`
    );

    newWindow?.focus();
  }

  return (
    <a
      target="_blank"
      data-url={props.href}
      href={props.href}
      onClick={showPopupWindow}
      className="no-underline"
    >
      <button className="bg-sky-500 hover:bg-sky-600 text-white transition-colors py-2 px-8 block rounded-md">
        {props.text}
      </button>
    </a>
  );
}
