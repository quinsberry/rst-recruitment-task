import { UserAddress as UserAddressDB } from '@prisma/client';

export interface UserAddress extends UserAddressDB {
    id: string;
    addressType: 'HOME' | 'INVOICE' | 'POST' | 'WORK';
}