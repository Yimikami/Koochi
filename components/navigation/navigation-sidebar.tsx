import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { NavigationHomeButton } from "./navigation-home-button";
import { SocketIndicator } from "@/components/socket-indicator";

export const NavigationSideBar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div
      className="flex h-full w-full flex-col items-center space-y-4 bg-[#E3E5E8] py-3
        text-primary dark:bg-[#1E1F22]"
    >
      <NavigationHomeButton />
      <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
      <ScrollArea className="w-full flex-1">
        {!!servers.length && (
          <>
            {servers.map((server) => (
              <div key={server.id} className="mb-4">
                <NavigationItem
                  id={server.id}
                  name={server.name}
                  imageUrl={server.imageUrl}
                />
              </div>
            ))}
            <Separator className="mx-auto mb-3 h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
          </>
        )}
        <NavigationAction />
      </ScrollArea>

      <div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
        <Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
        <SocketIndicator />
        <ModeToggle />
        <ClerkLoading>
          <Loader2 className="h-8 w-8 animate-spin text-primary dark:text-primary" />
        </ClerkLoading>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};
