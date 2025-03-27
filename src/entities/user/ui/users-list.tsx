import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Badge } from '@/shared/components/ui/badge';
import { FunctionComponent } from 'react';
import { User } from '../model';

interface UsersListProps {
    users: User[];
    onRowClick?: (user: User) => void;
    RowAction: FunctionComponent<{ user: User }>;
}

export const UsersList = ({ users, onRowClick, RowAction }: UsersListProps) => {
    const rows: (User | null)[] = users.length
        ? Array(10)
              .fill(null)
              .map((_, index) => users[index] || null)
        : [];
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
                <TableBody emptyMessage="No users found" className="h-[500px]">
                    {rows.map((user, index) =>
                        user ? (
                            <TableRow
                                key={user.id}
                                onClick={() => onRowClick?.(user)}
                                className="cursor-pointer hover:bg-muted/50 h-[50px]">
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
                        ) : (
                            <TableRow key={`empty-${index}`} className="h-[50px] hover:bg-background">
                                <TableCell colSpan={4}></TableCell>
                            </TableRow>
                        ),
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
