import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";

export default function Layout(props: { children: React.ReactNode }) {
  const eyebrowLinkClass =
    "px-6 py-2 block text-white no-underline hover:bg-brand-primary transition-colors";
  return (
    <>
      <TopNavHeader path="parents" />
      {props.children}
      <SiteFooter />
    </>
  );
}
