import { db } from "@/lib/db";

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  const memberOneProfileId = await getProfileIdForMember(memberOneId);
  const memberTwoProfileId = await getProfileIdForMember(memberTwoId);

  if (!memberOneProfileId || !memberTwoProfileId) {
    return null;
  }

  let conversation =
    (await findConversation(memberOneProfileId, memberTwoProfileId)) ||
    (await findConversation(memberTwoProfileId, memberOneProfileId));

  if (!conversation) {
    conversation = await createNewConversation(memberOneId, memberTwoId);
  }

  return conversation;
};

const getProfileIdForMember = async (memberId: string) => {
  try {
    const member = await db.member.findUnique({
      where: { id: memberId },
      select: { profileId: true },
    });
    return member?.profileId;
  } catch {
    return null;
  }
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        memberOne: {
          profileId: memberOneId,
        },
        AND: {
          memberTwo: {
            profileId: memberTwoId,
          },
        },
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
};
