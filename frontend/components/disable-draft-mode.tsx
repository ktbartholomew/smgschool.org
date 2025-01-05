"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const disable = () =>
    startTransition(async () => {
      await disableDraftMode();
      router.refresh();
    });

  return (
    <div className="p-2 bg-slate-900 text-center">
      <button
        type="button"
        className="py-1 px-4 text-sm rounded-sm bg-gray-200 border border-gray-500 hover:bg-gray-300 transition-colors"
        disabled={pending}
        onClick={disable}
      >
        {pending ? "Disabling..." : "Disable visual editing"}
      </button>
    </div>
  );
}
