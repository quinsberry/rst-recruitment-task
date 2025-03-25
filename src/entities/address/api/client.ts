'use client';

import { Address, convertToAddress } from '../model';
import { toast } from '@/shared/components/ui/sonner';

export const getUserAddresses = async (userId: number): Promise<Address[]> => {
    try {
        const addresses = await fetch(`/api/addresses?userId=${userId}`);
        const json: { data: Omit<Address, 'id'>[] } = await addresses.json();
        return json.data.map(convertToAddress);
    } catch (error) {
        toast.error('Failed to get addresses', {
            description: (error as Error).message,
        });
        console.error(error);
        throw new Error('Failed to get addresses');
    }
};
