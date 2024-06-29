"use client";

import { Home, Plus } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationHomeButton = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Koochi">
        <button className="group flex items-center">
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
