import { User as UserDB } from '@prisma/client';

export interface User extends UserDB {
    fullName: string;
}

export const convertUserToUser = (user: UserDB): User => {
    return {
        ...user,
        fullName: getUserFullName(user),
    };
};

export const getUserFullName = (user: User | UserDB) => {
    return `${user.firstName} ${user.lastName}`;
};
