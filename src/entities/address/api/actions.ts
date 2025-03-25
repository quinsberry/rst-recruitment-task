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
        };
    }

    try {
        const userAddress = await db.userAddress.update({
            where: {
                userId_addressType_validFrom: {
                    userId: parseInt(formData.userId as string),
                    addressType: formData.addressType as string,
                    validFrom: new Date(formData.validFrom as string),
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
            };
        }
        throw error;
    }
});
