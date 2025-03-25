'use client';

import { Fragment, useState } from 'react';
import { UsersList } from '@/features/users-list';
import { UserAddressDialog } from './user-addresses-dialog';
import { UserWithAddresses } from './model';

interface UserAddressListProps {
    users: UserWithAddresses[];
}
export const UserAddressList = ({ users: initialUsers }: UserAddressListProps) => {
    const [selectedUser, setSelectedUser] = useState<UserWithAddresses | null>(null);

    return (
        <Fragment>
            {selectedUser && (
                <UserAddressDialog
                    open={!!selectedUser}
                    onOpenChange={(open) => setSelectedUser(open ? selectedUser : null)}
                    user={selectedUser}
                    addresses={selectedUser.addresses}
                />
            )}
            <UsersList<UserWithAddresses> users={initialUsers} onRowClick={(user) => setSelectedUser(user)} />
        </Fragment>
    );
};
