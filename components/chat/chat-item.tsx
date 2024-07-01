"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Member, MemberRole, Profile } from "@prisma/client";
import { useRouter, useParams } from "next/navigation";

import Image from "next/image";

import { Crown, Edit, FileIcon, ShieldCheck, Trash } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip";
import { UserAvatar } from "@/components/user-avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <Crown className="ml-2 h-4 w-4 text-yellow-500" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
  sameUser = false,
}: ChatItemProps & { sameUser?: boolean }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/conversations/${member.id}`);
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content, form]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div
      className={cn(
        "group relative flex w-full items-center p-4 pb-[4px] transition hover:bg-black/5",
        sameUser && "p-0 pb-[4px]",
      )}
    >
      <div className="group flex w-full items-start gap-x-2">
        {!sameUser && (
          <div
            onClick={onMemberClick}
            className="cursor-pointer transition hover:drop-shadow-md"
          >
            <UserAvatar src={member.profile.imageUrl} />
          </div>
        )}
        <div
          className={cn(
            "flex w-full flex-col",
            (isImage || isPDF) && sameUser && "pl-14 md:pl-16",
          )}
        >
          {!sameUser && (
            <div className="flex items-center gap-x-2">
              <div className="flex items-center">
                <p
                  onClick={onMemberClick}
                  className="cursor-pointer text-sm font-semibold hover:underline"
                >
                  {member.profile.name}
                </p>
                <ActionTooltip label={member.role}>
                  {roleIconMap[member.role]}
                </ActionTooltip>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
          )}
          {isImage && (
            <a
              onClick={() => onOpen("openImage", { fileUrl, content })}
              className="max-h-auto relative mt-2 flex max-w-[300px] items-center overflow-hidden
                rounded-md border bg-secondary"
            >
              <Image
                src={fileUrl}
                alt={content}
                quality={100}
                width={800}
                height={600}
              />
            </a>
          )}
          {isPDF && (
            <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
              >
                {fileUrl.split("/").pop()}
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                sameUser && "mt-0 pl-5",
                deleted &&
                  "mt-1 text-xs italic text-zinc-500 dark:text-zinc-400",
              )}
            >
              {sameUser && (
                <span
                  className="mr-[7px] text-[10px] font-semibold text-white group-hover:text-zinc-600
                    dark:text-[#313338] group-hover:dark:text-zinc-400 md:mr-[19px]"
                >
                  {timestamp}
                </span>
              )}
              {content}
              {isUpdated && !deleted && (
                <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className={cn(
                  "mt-2 flex w-full items-center gap-x-2 pt-2",
                  sameUser && "pl-14 md:pl-16",
                )}
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="border-0 border-none bg-zinc-200/90 p-2 text-zinc-600 focus-visible:ring-0
                              focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                          <div className="absolute right-2 top-2">
                            <EmojiPicker
                              onChange={(emoji: string) =>
                                field.onChange(`${field.value} ${emoji}`)
                              }
                            />
                          </div>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size={"sm"} variant={"primary"}>
                  Save
                </Button>
              </form>
              <span
                className={cn(
                  "text-xs text-zinc-500 dark:text-zinc-400",
                  sameUser && "pl-14 md:pl-16",
                )}
              >
                Press escape to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && !isEditing && (
        <div
          className="bg-whit absolute -top-2 right-5 hidden items-center gap-x-2 rounded-sm border
            p-1 group-hover:flex dark:bg-zinc-800"
        >
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="ml-auto h-4 w-4 cursor-pointer text-zinc-500 transition hover:text-zinc-600
                  dark:hover:text-zinc-300"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="ml-auto h-4 w-4 cursor-pointer text-zinc-500 transition hover:text-red-600
                dark:hover:text-red-600"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};
