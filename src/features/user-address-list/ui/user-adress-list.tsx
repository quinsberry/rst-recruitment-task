'use client';

import { useState } from 'react';
import { UsersList } from '@/entities/user';
import { UserWithAddresses } from '../model';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { UserAddressDialog } from '@/entities/user-address';

interface UserAddressListProps {
    users: UserWithAddresses[];
}
export const UserAddressList = ({ users: initialUsers }: UserAddressListProps) => {
    const [users] = useState<UserWithAddresses[]>(initialUsers);
    const [selectedUser, setSelectedUser] = useState<UserWithAddresses | null>(null);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users with addresses</h1>
                <Button onClick={() => {}}>Create User</Button>
            </div>
            {selectedUser && (
                <UserAddressDialog
                    userId={selectedUser.id}
                    open={!!selectedUser}
                    onOpenChange={() => setSelectedUser(null)}
                    userName={`${selectedUser.firstName} ${selectedUser.lastName}`}
                    addresses={selectedUser.addresses}
                />
            )}
            <UsersList
                users={users}
                onRowClick={(user) => setSelectedUser(user)}
                RowAction={() => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            />
        </div>
    );
};
