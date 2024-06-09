"use client";

import {
  Context,
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
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
  const [hidden, setHidden] = useState(false);
  const [left, setLeft] = useState(0);

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
