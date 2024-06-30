"use client";

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { differenceInMinutes, format } from "date-fns";
import { ChatItem } from "./chat-item";
import { useChatSocket } from "@/hooks/use-chat-socket";

let DATE_FORMAT = "";

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const addKey = `chat:${chatId}:messages`;
  const updateKey = `chat:${chatId}:messages:update`;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  useChatSocket({ queryKey, addKey, updateKey });

  if (status === "pending") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <ServerCrash className="my-4 h-7 w-7 text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome type={type} name={name} />
      <div className="mt-auto flex flex-col-reverse">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map(
              (
                message: MessageWithMemberWithProfile,
                index: number,
                arr: any[],
              ) => {
                const previousMessage = arr[index + 1];

                let sameUser =
                  previousMessage &&
                  previousMessage.member.profile.name ===
                    message.member.profile.name;

                let timeDifference = 0;
                if (previousMessage && sameUser) {
                  const currentMessageDate = new Date(message.createdAt);
                  const previousMessageDate = new Date(
                    previousMessage.createdAt,
                  );
                  timeDifference = differenceInMinutes(
                    currentMessageDate,
                    previousMessageDate,
                  );
                }

                if (timeDifference > 1) {
                  sameUser = false;
                }

                if (sameUser) {
                  DATE_FORMAT = "HH:mm";
                } else {
                  DATE_FORMAT = "d MMM yyyy, HH:mm";
                }
                return (
                  <ChatItem
                    key={message.id}
                    id={message.id}
                    currentMember={member}
                    member={message.member}
                    content={message.content}
                    fileUrl={message.fileUrl}
                    deleted={message.deleted}
                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                    isUpdated={message.updatedAt !== message.createdAt}
                    socketUrl={socketUrl}
                    socketQuery={socketQuery}
                    sameUser={sameUser}
                  />
                );
              },
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
