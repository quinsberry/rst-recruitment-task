'use server';

import { userAddressScheme } from '@/shared/validators/user-address-scheme';
import { db } from '@/shared/lib/db';
import { createAction } from '@/shared/lib/actions';
import { convertToAddress, Address } from '../model';

export const addAddressAction = createAction<Address, FormData>(async (prevState, data) => {
    const formData = Object.fromEntries(data);
    const parsed = userAddressScheme.safeParse(formData);

    if (!parsed.success) {
        return {
            status: 'validationError',
            message: 'Validation failed',
            validationErrors: parsed.error.flatten(),
            data: null,
        };
    }

    try {
        const userAddress = await db.userAddress.create({
            data: {
                ...parsed.data,
                userId: parseInt(formData.userId as string),
            },
        });

        return {
            status: 'success',
            message: 'Address added successfully',
            data: convertToAddress(userAddress),
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'error',
                message: 'Failed to add address',
                error: error.message,
                data: null,
            };
        }
        throw error;
    }
});

export const updateAddressAction = createAction<Address, FormData>(async (prevState, data) => {
    const formData = Object.fromEntries(data);
    const parsed = userAddressScheme.safeParse(formData);

    if (!parsed.success) {
        return {
            status: 'validationError',
            message: 'Validation failed',
            validationErrors: parsed.error.flatten(),
            data: null,
        };
    }

    try {
        // TODO: fix issues with the validFrom date
        const userAddress = await db.userAddress.update({
            where: {
                userId_addressType_validFrom: {
                    userId: parseInt(formData.userId as string),
                    addressType: prevState.data?.addressType!,
                    validFrom: new Date(prevState.data?.validFrom!),
                },
            },
            data: {
                ...parsed.data,
            },
        });

        return {
            status: 'success',
            message: 'Address updated successfully',
            data: convertToAddress(userAddress),
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'error',
                message: 'Failed to update address',
                error: error.message,
                data: null,
            };
        }
        throw error;
    }
});
