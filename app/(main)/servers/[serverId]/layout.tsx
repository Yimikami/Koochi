import { ServerSidebar } from "@/components/server/server-sidebar";
import { ServerSidebarRight } from "@/components/server/server-sidebar-right";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="flex h-full">
      <div className="hidden h-full w-60 flex-col md:flex">
        <ServerSidebar serverId={params.serverId} />
      </div>
      <main className="flex h-full flex-1">
        <div className="flex-1">{children}</div>
      </main>
      <div className="hidden h-full w-60 flex-col md:flex">
        <ServerSidebarRight serverId={params.serverId} />
      </div>
    </div>
  );
};

export default ServerIdLayout;
