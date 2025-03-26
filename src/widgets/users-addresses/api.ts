import { db } from '@/shared/lib/db';
import { UserWithAddresses } from './model';
import { convertToAddress } from '@/entities/address/model';
import { getUserFullName } from '@/entities/user/model';

export const getUserWithAddresses = async (): Promise<UserWithAddresses[]> => {
    const response = await db.user.findMany({
        include: {
            addresses: true,
        },
    });
    return response.map((user) => ({
        ...user,
        fullName: getUserFullName(user),
        addresses: user.addresses.map(convertToAddress),
    }));
};
