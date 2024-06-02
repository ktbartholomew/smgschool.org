"use client";

import {
  Children,
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export let SecondaryNavContext: Context<{
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}>;

export function SecondaryNavController({ children }: { children: any }) {
  const [active, setActive] = useState("");
  SecondaryNavContext = createContext({ active, setActive });

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        setActive("");
      }
    });
    window.addEventListener("click", (e: MouseEvent) => {
      setActive("");
    });
  }, []);

  return (
    <SecondaryNavContext.Provider value={{ active, setActive }}>
      {children}
    </SecondaryNavContext.Provider>
  );
}

export function SecondaryNavList({
  children,
  navLinkId,
}: {
  children: ReactNode;
  navLinkId: string;
}) {
  const navContext = useContext(SecondaryNavContext);
  const [hidden, setHidden] = useState(navContext.active !== navLinkId);
  const [left, setLeft] = useState(0);

  useLayoutEffect(() => {
    const link = document.querySelector(`[data-nav-link="${navLinkId}"]`);
    if (!link) {
      return;
    }

    setLeft(window.innerWidth - link.getBoundingClientRect().right);

    const handler = () => {
      setHidden(false);
      setLeft(window.innerWidth - link.getBoundingClientRect().right);
      navContext.setActive(navLinkId);
    };

    const unhandler = () => {
      setHidden(true);
      navContext.setActive("");
    };

    link.addEventListener("mouseenter", handler);
    link.addEventListener("focus", handler);
    link.addEventListener("blur", unhandler);

    return () => {
      link.removeEventListener("mouseenter", handler);
      link.removeEventListener("focus", handler);
      link.removeEventListener("blur", unhandler);
    };
  }, [navLinkId]);

  return (
    <nav
      data-secondary-nav={navLinkId}
      className={`absolute z-30 flex text-white bg-brand-primary-600 ${
        hidden ? "hidden" : ""
      }`}
      style={{ right: `${left}px` }}
    >
      {children}
    </nav>
  );
}
