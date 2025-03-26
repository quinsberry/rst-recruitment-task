'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Address } from '@/entities/address';
import { User } from '@/entities/user';
import { UserAddressList } from '@/features/user-addresses-list';

interface UserAddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    addresses?: Address[];
    user: User;
}

export const UserAddressDialog = ({ addresses, user, open, onOpenChange }: UserAddressDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
            <DialogContent className="w-full sm:max-w-3xl pt-8">
                <DialogHeader>
                    <DialogTitle className="sr-only">{user.fullName} addresses</DialogTitle>
                </DialogHeader>
                <UserAddressList addresses={addresses} user={user} />
            </DialogContent>
        </Dialog>
    );
};
