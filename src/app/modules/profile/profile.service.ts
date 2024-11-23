import prisma from "../../config";

interface CreateProfileInput {
  userId: number;
  bio: string;
  profilePhoto: string;
}

interface UpdateProfileInput {
  userId: number;
  bio?: string;
  profilePhoto?: string;
}

// Create Profile (Transaction-Based)
const createProfile = async (data: CreateProfileInput) => {
  const { userId, bio, profilePhoto } = data;

  return await prisma.$transaction(async (tx: any) => {
    // Check if the user exists
    const user = await tx.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} does not exist.`);
    }

    // Check if a profile already exists
    const existingProfile = await tx.profile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new Error(`Profile already exists for user with ID ${userId}.`);
    }

    // Create the profile
    const profile = await tx.profile.create({
      data: {
        userId,
        bio,
        profilePhoto,
      },
    });

    return profile;
  });
};

// Update User and Profile in a Transaction
interface UpdateProfileInput {
  userId: number;
  bio?: string;
  profilePhoto?: string;
}

// Update Profile (Transaction-Based)
export const updateProfile = async (data: UpdateProfileInput) => {
  const { userId, bio, profilePhoto } = data;

  return await prisma.$transaction(async (tx: any) => {
    // Check if the profile exists
    const profile = await tx.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new Error(`Profile does not exist for user with ID ${userId}.`);
    }

    // Update the profile
    const updatedProfile = await tx.profile.update({
      where: { userId },
      data: {
        bio: bio || profile.bio,
        profilePhoto: profilePhoto || profile.profilePhoto,
      },
    });

    return updatedProfile;
  });
};

export const profileService = {
  createProfile,
  updateProfile,
};
