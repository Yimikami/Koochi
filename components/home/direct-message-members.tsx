"use client";

import { cn } from "@/lib/utils";
import { Member, Profile } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  profileId: string;
}

export const DirectMessageMembers = ({
  member,
  profileId,
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    if (member.profile.id === profileId) {
      return;
    }
    router.push(`/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        `group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition
        hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50`,
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700",
      )}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          `text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600
          dark:text-zinc-400 dark:group-hover:text-zinc-300`,
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white",
        )}
      >
        {member.profile.name}
      </p>
    </button>
  );
};
