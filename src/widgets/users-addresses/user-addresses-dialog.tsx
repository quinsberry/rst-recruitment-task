'use client';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
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
            <DialogContent className="min-w-fit pt-10">
                <div className="flex flex-col gap-4">
                    <UserAddressList addresses={addresses} user={user} />
                </div>
            </DialogContent>
        </Dialog>
    );
};
