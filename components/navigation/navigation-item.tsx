"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const NavigationItem = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button onClick={onClick} className="group relative flex items-center">
        <div
          className={cn(
            "absolute left-0 w-[4px] rounded-r-full bg-primary transition-all",
            params?.serverId !== id && "grup-hover:h-[20px]",
            params?.serverId === id ? "h-[36px]" : "h-[8px]",
          )}
        />
        <div
          className={cn(
            `group relative mx-3 flex h-[48px] w-[48px] overflow-hidden rounded-[24px]
            transition-all group-hover:rounded-[16px]`,
            params?.serverId === id &&
              "rounded-[16px] bg-primary/10 text-primary",
          )}
        >
          <Image fill src={imageUrl} alt="Channel" sizes="48" priority />
        </div>
      </button>
    </ActionTooltip>
  );
};
