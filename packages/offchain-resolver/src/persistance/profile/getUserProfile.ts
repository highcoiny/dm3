/* eslint-disable max-len */
import { ethers } from 'ethers';
import { PrismaClient, Prisma } from '@prisma/client';
import { UserProfile } from 'dm3-lib-profile/dist.backend';

/**
 *
 * @param {db} db - Prisma client
 * @param {string} name - Ethereum name
 * @returns {Promise<Lib.profile.UserProfile>} A promise that resolves to the user profile object or null if the user is not found
 */

export function getUserProfile(db: PrismaClient) {
    return async (name: string) => {
        const profileContainer = await db.profileContainer.findUnique({
            where: {
                nameHash: ethers.utils.namehash(name),
            },
        });

        return profileContainer && profileContainer.profile
            ? (JSON.parse(profileContainer.profile.toString()) as UserProfile)
            : null;
    };
}