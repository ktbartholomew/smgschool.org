"use server";

import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";

export default async function Home() {
  return (
    <>
      <TopNavHeader />
      <main className="">
        <div className="text-center py-32 prose text-lg">
          <h2>Page Not Found</h2>
          <p>Sorry.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
