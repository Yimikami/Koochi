"use client";

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Crown, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
  profileId: string;
}

const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="mr-2 h-4 w-4 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <Crown className="mr-2 h-4 w-4 text-yellow-500" />,
};

export const ServerMember = ({ member, profileId }: ServerMemberProps) => {
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    if (member.profile.id === profileId) {
      return;
    }
    router.push(`/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className="group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition
        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className="text-sm font-semibold text-zinc-700 transition group-hover:text-zinc-900
          dark:text-zinc-300 dark:group-hover:text-zinc-100"
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
