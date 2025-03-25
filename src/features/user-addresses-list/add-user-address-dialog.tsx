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
import { Address, AddressForm } from '@/entities/address';
import { useUserAddressesStore } from './user-addresses-store';
import { addAddressAction } from '@/entities/address';
import { useState } from 'react';
export const AddUserAddressDialog = () => {
    const { user, addAddress } = useUserAddressesStore();
    const [isOpen, setIsOpen] = useState(false);
    const handleSubmit = (data: Address) => {
        addAddress(data);
        setIsOpen(false);
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add address</DialogTitle>
                    <DialogDescription>Add a new address for {user.fullName}</DialogDescription>
                </DialogHeader>
                <AddressForm userId={user.id} onSubmit={handleSubmit} action={addAddressAction} />
            </DialogContent>
        </Dialog>
    );
};
