import { ServerSidebar } from "@/components/server/server-sidebar";
import { ServerSidebarRight } from "@/components/server/server-sidebar-right";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ServerIdLayout = async (
  props: {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>;
  }
) => {
  const params = await props.params;

  const {
    children
  } = props;

  const profile = await currentProfile();
  const { redirectToSignIn } = await auth();
  if (!profile) {
    return redirectToSignIn();
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
    include: {
      channels: true,
    },
  });

  if (!server) {
    return redirect("/");
  }

  // Ensure that the server data is consistent and does not change between renders
  const initialChannel = server.channels[0];
  if (!initialChannel || initialChannel.name !== "general") {
    return null;
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
