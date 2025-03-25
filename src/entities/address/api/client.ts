'use client';

import { Address, convertToAddress } from '../model';
import { AddressType } from '@/shared/validators/user-address-scheme';
import { toast } from '@/shared/components/ui/sonner';

export const getUserAddresses = async (userId: number): Promise<Address[]> => {
    try {
        const addresses = await fetch(`/api/addresses?userId=${userId}`);
        const json: { data: Address[] } = await addresses.json();
        return json.data.map(convertToAddress);
    } catch (error) {
        toast.error('Failed to get addresses', {
            description: (error as Error).message,
        });
        console.error(error);
        throw new Error('Failed to get addresses');
    }
};

export const deleteClientUserAddress = async (
    userId: number,
    addressType: AddressType,
    validFrom: Date,
): Promise<void> => {
    try {
        const response = await fetch(
            `/api/addresses?userId=${userId}&addressType=${addressType}&validFrom=${validFrom}`,
            {
                method: 'DELETE',
            },
        );
        const json: { error?: string } = await response.json();
        if (json.error) {
            throw new Error(json.error);
        }
    } catch (error) {
        toast.error('Failed to delete address', {
            description: (error as Error).message,
        });
        console.error(error);
        throw new Error('Failed to delete address');
    }
};
