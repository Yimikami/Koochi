import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
  params: Promise<{
    serverId: string;
  }>;
}

const ServerIdPage = async (props: ServerIdPageProps) => {
  const params = await props.params;
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

  const initialChannel = server.channels[0];
  if (!initialChannel || initialChannel.name !== "general") {
    return null;
  }
  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
