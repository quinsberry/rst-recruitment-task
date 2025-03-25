import { db } from '@/shared/lib/db';
import { UserAddress } from '../model';
import { addressTypeScheme } from '@/shared/validators/user-address-scheme';

export const getUserAddresses = async (userId: number): Promise<UserAddress[]> => {
    const addresses = await db.userAddress.findMany({
        where: {
            userId,
        },
    });
    return addresses.map((address) => ({
        ...address,
        id: getAddressId(address as UserAddress),
        addressType: addressTypeScheme.parse(address.addressType),
    }));
};

function getAddressId(address: Omit<UserAddress, 'id'>): string {
    return `${address.userId}-${address.street}-${address.buildingNumber}-${address.city}-${address.postCode}-${address.validFrom}`;
}
