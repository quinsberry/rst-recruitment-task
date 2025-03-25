'use client';

import { Fragment, useState } from 'react';
import { UsersList } from '@/features/users-list';
import { UserAddressDialog } from './user-addresses-dialog';
import { UserWithAddresses } from './model';
import { User } from '@/entities/user';

interface UserAddressListProps {
    users: UserWithAddresses[];
}
export const UserAddressList = ({ users: initialUsers }: UserAddressListProps) => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <Fragment>
            {selectedUser && (
                <UserAddressDialog
                    open={!!selectedUser}
                    onOpenChange={(open) => setSelectedUser(open ? selectedUser : null)}
                    user={selectedUser}
                />
            )}
            <UsersList users={initialUsers} onRowClick={setSelectedUser} />
        </Fragment>
    );
};
