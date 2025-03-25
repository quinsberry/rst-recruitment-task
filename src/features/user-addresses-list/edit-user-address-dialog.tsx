'use client';

import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Address } from '@/entities/address';
import { AddressForm } from '@/entities/address';
import { useUserAddressesStore } from './user-addresses-store';
import { updateAddressAction } from '@/entities/address';
import { useState } from 'react';

interface UserAddressDialogProps {
    address: Address;
    userName: string;
}

export const EditUserAddressDialog = ({ address, userName }: UserAddressDialogProps) => {
    const { updateAddress } = useUserAddressesStore();
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (data: Address) => {
        updateAddress(data);
        setIsOpen(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className="w-full">
                    Edit address
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit address</DialogTitle>
                    <DialogDescription>Edit address for {userName}</DialogDescription>
                </DialogHeader>
                <AddressForm
                    action={updateAddressAction}
                    onSubmit={handleSubmit}
                    userId={address.userId}
                    data={address}
                />
            </DialogContent>
        </Dialog>
    );
};
