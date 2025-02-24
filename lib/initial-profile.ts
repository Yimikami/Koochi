import { auth, currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    // Update profile image if it's changed
    if (profile.imageUrl !== user.imageUrl) {
      await db.profile.update({
        where: { id: profile.id },
        data: { imageUrl: user.imageUrl },
      });
    }
    return profile;
  }

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.username}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
