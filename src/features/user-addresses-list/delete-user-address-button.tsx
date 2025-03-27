'use client';

import { Address, deleteAddressAction } from '@/entities/address';
import { useActionState, useEffect } from 'react';
import { useUserAddressesStore } from './user-addresses-store';
import { Button } from '@/shared/components/ui/button';
import { toast } from '@/shared/components/ui/sonner';

export function DeleteUserAddressButton({ address }: { address: Address }) {
    const { deleteAddress } = useUserAddressesStore();
    const [state, formAction, isPending] = useActionState(deleteAddressAction, {
        status: 'idle',
        message: '',
        data: null,
    });

    useEffect(() => {
        if (state.status === 'success') {
            deleteAddress(address);
            toast.success('Address deleted successfully!');
        } else if (state.status === 'error') {
            console.error(state.error);
        }
    }, [state.status]);

    const handleAction = async (formData: FormData) => {
        Object.entries(address).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });
        formAction(formData);
    };

    return (
        <form action={handleAction}>
            <Button type="submit" variant={'ghost'} isInProgress={isPending} className="w-full text-destructive hover:text-destructive">
                Delete
            </Button>
        </form>
    );
}
