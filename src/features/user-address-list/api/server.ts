import { db } from '@/shared/lib/db';
import { UserWithAddresses } from '../model';

export const getUserWithAddresses = async (): Promise<UserWithAddresses[]> => {
    const response = await db.user.findMany({
        include: {
            addresses: true,
        },
    });
    return response;
};
