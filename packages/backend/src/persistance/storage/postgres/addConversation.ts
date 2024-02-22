import { PrismaClient } from '@prisma/client';
export const addConversation =
    (db: PrismaClient) => async (ensName: string, contactName: string) => {
        try {
            let account = await db.account.findFirst({
                where: {
                    id: ensName,
                },
            });

            if (!account) {
                //Create account
                account = await db.account.create({
                    data: {
                        id: ensName,
                    },
                });
            }

            const conversationAlreadyExists = await db.conversation.findFirst({
                where: {
                    accountId: ensName,
                    encryptedId: contactName,
                },
            });

            if (!conversationAlreadyExists) {
                await db.conversation.create({
                    data: {
                        encryptedId: contactName,
                        accountId: ensName,
                    },
                });
            }

            return true;
        } catch (e) {
            console.log('addConversation error ', e);
            return false;
        }
    };
