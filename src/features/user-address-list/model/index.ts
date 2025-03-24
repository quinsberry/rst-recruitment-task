import { User } from '@/entities/user';
import { UserAddress } from '@/entities/user-address';

export interface UserWithAddresses extends User {
    addresses: UserAddress[];
}
