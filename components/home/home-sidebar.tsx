import { BadgeDollarSign, Mail, Plus, Store, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ActionTooltip } from "@/components/action-tooltip";
import { DirectMessageMembers } from "./direct-message-members";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

export const HomeSidebar = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirect("/");
  }

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        {
          memberOne: {
            profileId: profile.id,
          },
        },
        {
          memberTwo: {
            profileId: profile.id,
          },
        },
      ],
    },
    include: {
      memberOne: {
        include: {
          profile: true,
        },
      },
      memberTwo: {
        include: {
          profile: true,
        },
      },
    },
  });

  const otherMembers = conversations.map((conversation) => {
    if (conversation.memberOne.profileId === profile.id) {
      return conversation.memberTwo;
    }
    return conversation.memberOne;
  });

  return (
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
      <div className="flex items-center justify-between">
        <button
          className="border-b-1 group mx-2 my-2 flex w-full items-center gap-x-2 rounded-md
            border-neutral-200 bg-slate-200 px-2 py-1 transition hover:bg-zinc-700/10
            dark:border-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-700/50"
        >
          <p
            className="text-sm text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400
              dark:group-hover:text-zinc-300"
          >
            Find or start a conversation
          </p>
        </button>
      </div>
      <Separator className="border-b-2 border-neutral-200 dark:border-neutral-800" />
      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-y-2">
          <div className="mt-[1px] flex w-full items-center space-x-2">
            <button
              className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                text-zinc-600 hover:bg-zinc-300 dark:text-zinc-400 dark:hover:bg-zinc-700
                hover:dark:text-zinc-300"
            >
              <User className="h-6 w-6" />
              <p className="text-[15px]">Friends</p>
            </button>
          </div>
          <div className="mt-[1px] flex items-center space-x-2">
            <button
              className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                text-zinc-600 hover:bg-zinc-300 dark:text-zinc-400 dark:hover:bg-zinc-700
                hover:dark:text-zinc-300"
            >
              <BadgeDollarSign className="h-6 w-6" />
              <p className="text-[15px]">Nitro </p>
            </button>
          </div>
          <div className="mt-[1px] flex items-center space-x-2">
            <button
              className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                text-zinc-600 hover:bg-zinc-300 dark:text-zinc-400 dark:hover:bg-zinc-700
                hover:dark:text-zinc-300"
            >
              <Mail className="h-6 w-6" />
              <p className="text-[15px]">Message Requests</p>
            </button>
          </div>
          <div className="mt-[1px] flex items-center space-x-2">
            <button
              className="group flex w-full items-center gap-x-3 rounded-md px-2 py-2 font-sans
                text-zinc-600 hover:bg-zinc-300 dark:text-zinc-400 dark:hover:bg-zinc-700
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
          {otherMembers.map((member) => (
            <DirectMessageMembers
              key={member.id}
              member={member}
              profileId={profile.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
