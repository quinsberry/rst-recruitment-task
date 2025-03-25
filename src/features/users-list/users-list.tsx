'use client';

import { User, UsersList as UserList } from '@/entities/user';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { UsersProvider, useUsersStore } from './users-store';
import { useListPagination } from '@/shared/components/list-pagination';

interface ListProps {
    onRowClick?: (user: User) => void;
}
const List = ({ onRowClick }: ListProps) => {
    const { users } = useUsersStore();
    const { paginatedItems, ListPagination } = useListPagination({ listItems: users, itemsPerPage: 10 });
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users with addresses</h1>
                <Button onClick={() => {}}>Create User</Button>
            </div>
            <UserList
                users={paginatedItems}
                onRowClick={onRowClick}
                RowAction={() => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}>
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            />
            <ListPagination />
        </div>
    );
};

interface UsersListProps extends ListProps {
    users: User[];
}

export const UsersList = ({ users, onRowClick }: UsersListProps) => {
    return (
        <UsersProvider initialUsers={users}>
            <List onRowClick={onRowClick} />
        </UsersProvider>
    );
};
