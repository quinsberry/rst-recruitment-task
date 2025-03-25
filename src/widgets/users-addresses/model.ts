import { User } from '@/entities/user';
import { Address } from '@/entities/address';

export interface UserWithAddresses extends User {
    addresses: Address[];
}
