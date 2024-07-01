import { Hash } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { MembersToggle } from "@/components/members-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { ChatVideoButton } from "@/components/chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div
      className="flex h-12 items-center justify-between border-b-2 border-neutral-200 px-3
        font-semibold dark:border-neutral-800"
    >
      <div className="flex items-center">
        <MobileToggle serverId={serverId} />
        {type === "channel" && (
          <Hash className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
        )}
        {type === "conversation" && (
          <UserAvatar src={imageUrl} className="mr-2 h-8 w-8 md:h-8 md:w-8" />
        )}
        <p className="text-md font-semibold text-black dark:text-white">
          {name}
        </p>
      </div>
      <div className="ml-auto flex items-center">
        {type === "conversation" && <ChatVideoButton />}
        {serverId && <MembersToggle serverId={serverId} />}
      </div>
    </div>
  );
};
