import { BadgeDollarSign, Mail, Plus, Store, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ActionTooltip } from "@/components/action-tooltip";

export const HomeSidebar = () => {
  return (
    <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
      <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
        <div className="flex items-center justify-between">
          <button
            className="group mx-2 my-2 flex w-full items-center gap-x-2 rounded-md bg-slate-200 px-2
              py-1 transition hover:bg-zinc-700/10 dark:bg-zinc-900 dark:hover:bg-zinc-700/50"
          >
            <p
              className="text-sm text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400
                dark:group-hover:text-zinc-300"
            >
              Find or start a conversation
            </p>
          </button>
        </div>
        <Separator className="my-1 h-[1px] bg-slate-300 dark:bg-zinc-900" />
        <ScrollArea className="flex-1 px-3">
          <div className="flex flex-col gap-y-2">
            <div className="mt-[1px] flex w-full items-center space-x-2">
              <button
                className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                  text-zinc-600 hover:bg-slate-200 dark:text-zinc-400 dark:hover:bg-zinc-700
                  hover:dark:text-zinc-300"
              >
                <User className="h-6 w-6" />
                <p className="text-[15px]">Friends</p>
              </button>
            </div>
            <div className="mt-[1px] flex items-center space-x-2">
              <button
                className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                  text-zinc-600 hover:bg-slate-200 dark:text-zinc-400 dark:hover:bg-zinc-700
                  hover:dark:text-zinc-300"
              >
                <BadgeDollarSign className="h-6 w-6" />
                <p className="text-[15px]">Nitro </p>
              </button>
            </div>
            <div className="mt-[1px] flex items-center space-x-2">
              <button
                className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                  text-zinc-600 hover:bg-slate-200 dark:text-zinc-400 dark:hover:bg-zinc-700
                  hover:dark:text-zinc-300"
              >
                <Mail className="h-6 w-6" />
                <p className="text-[15px]">Message Requests</p>
              </button>
            </div>
            <div className="mt-[1px] flex items-center space-x-2">
              <button
                className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                  text-zinc-600 hover:bg-slate-200 dark:text-zinc-400 dark:hover:bg-zinc-700
                  hover:dark:text-zinc-300"
              >
                <Store className="h-6 w-6" />
                <p className="text-[15px]">Shop</p>
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
                Direct Messages
              </p>

              <ActionTooltip label="Create DM" side="top">
                <button
                  className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400
                    dark:hover:text-zinc-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </ActionTooltip>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
