import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { FunctionComponent } from 'react';
import { User } from '../model';

interface UsersListProps<U extends User> {
    users: U[];
    onRowClick?: (user: U) => void;
    RowAction: FunctionComponent<{ user: U }>;
}

export const UsersList = <U extends User>({ users, onRowClick, RowAction }: UsersListProps<U>) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            onClick={() => onRowClick?.(user)}
                            className="cursor-pointer hover:bg-muted/50 h-10">
                            <TableCell>
                                {user.firstName} {user.lastName}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge>{user.status}</Badge>
                            </TableCell>
                            <TableCell>
                                <RowAction user={user} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
