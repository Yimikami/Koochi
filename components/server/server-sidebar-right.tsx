import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSection } from "./server-section";
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
    <div className="flex h-full w-full flex-col bg-[#F2F3F5] text-primary dark:bg-[#2B2D31]">
      <div
        className="h-12 w-full cursor-default border-b-2 border-neutral-200 px-3 pt-4 font-sans
          text-sm dark:border-neutral-800"
      >
        <ServerSection
          sectionType="members"
          role={role}
          label={`Members (${server?.members.length})`}
          server={server}
        />
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="flex flex-col gap-y-2">
          <div className="mt-[1px] flex items-center space-x-2">
            <div className="w-full space-y-[2px]">
              {server?.members.map((member) => (
                <ServerMember key={member.id} member={member} profileId={profile.id} server={server} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
