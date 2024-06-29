import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSection } from "./server-section";
import { Separator } from "../ui/separator";
import { ServerMember } from "./server-members";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebarRight = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const members = server?.members.filter(
    (member) => member.profileId !== profile.id,
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id,
  )?.role;

  return (
    <div
      className="flex h-full w-full flex-col border-b-2 border-neutral-200 bg-[#F2F3F5] px-3
        font-semibold text-primary dark:border-neutral-800 dark:bg-[#2B2D31]"
    >
      <ScrollArea className="flex-1 px-3 pt-2">
        {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
            <div className="space-y-[2px]">
              {members.map((member) => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
