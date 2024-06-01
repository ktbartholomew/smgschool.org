"use server";

import SiteFooter from "@/components/site-footer";
import { TopNavHeader } from "@/components/site-header";

export default async function Home() {
  return (
    <>
      <TopNavHeader />
      <main className="">
        <div className="text-center py-32">
          <h2 className="text-6xl font-black tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-xl">Sorry.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
