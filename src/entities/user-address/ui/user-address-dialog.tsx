import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/components/ui/dialog';
import { UserAddressList } from './user-address-list';
import { UserAddress } from '../model';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { AddUserAddressDialog } from './add-user-address-dialog';
import { EditUserAddressDialog } from './edit-user-address-dialog';

interface UserAddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userName: string;
    addresses: UserAddress[];
    userId: UserAddress['userId'];
}

export const UserAddressDialog = ({ open, onOpenChange, userName, addresses, userId }: UserAddressDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
            <DialogContent className="min-w-fit">
                <DialogHeader>
                    <DialogTitle>{userName} addresses</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <UserAddressList
                        addresses={addresses}
                        RowAction={({ address }) => (
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
                                            e.preventDefault();
                                        }}
                                        asChild>
                                        <EditUserAddressDialog address={address} userName={userName} />
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Button variant={'ghost'} className='w-full'>Delete</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    />
                </div>
                <DialogFooter>
                    <AddUserAddressDialog userId={userId} userName={userName} />
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
