import { addressTypeScheme } from '@/shared/validators/user-address-scheme';
import { UserAddress as AddressDB } from '@prisma/client';

export interface Address extends AddressDB {
    id: string;
    addressType: 'HOME' | 'INVOICE' | 'POST' | 'WORK';
}

export const convertToAddress = (address: AddressDB): Address => {
    return {
        ...address,
        id: `${address.userId}-${address.addressType}-${address.validFrom}`,
        addressType: addressTypeScheme.parse(address.addressType),
        validFrom: new Date(address.validFrom),
        createdAt: new Date(address.createdAt),
        updatedAt: new Date(address.updatedAt),
    };
};
