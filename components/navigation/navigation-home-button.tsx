"use client";

import { Home } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useRouter } from "next/navigation";

export const NavigationHomeButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Direct Messages">
        <button onClick={onClick} className="group flex items-center">
          <div
            className="mx-3 flex h-[48px] w-[48px] items-center justify-center overflow-hidden
              rounded-[24px] bg-background transition-all group-hover:rounded-[16px]
              group-hover:bg-emerald-500 dark:bg-neutral-700"
          >
            <Home
              className="text-emerald-500 transition group-hover:text-white"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
