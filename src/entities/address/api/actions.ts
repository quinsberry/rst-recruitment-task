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

    if (!prevState.data) {
        throw new Error('Address not found');
    }
    try {
        const existingAddress = await db.userAddress.findFirst({
            where: {
                userId: parseInt(formData.userId as string),
                addressType: prevState.data.addressType,
                validFrom: prevState.data.validFrom,
            },
        });

        if (!existingAddress) {
            return {
                status: 'error',
                message: 'Address not found',
                error: 'Record not found',
                data: prevState.data,
            };
        }

        const userAddress = await db.userAddress.update({
            where: {
                userId_addressType_validFrom: {
                    userId: parseInt(formData.userId as string),
                    addressType: prevState.data.addressType,
                    validFrom: existingAddress.validFrom,
                },
            },
            data: {
                ...parsed.data,
                validFrom: new Date(parsed.data.validFrom),
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

export const deleteAddressAction = createAction<Address, FormData>(async (prevState, data) => {
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
    console.log('formData.userId', formData.userId);
    console.log('parsed.data', parsed.data);

    try {
        const address = await db.userAddress.findFirst({
            where: {
                userId: parseInt(formData.userId as string),
                addressType: parsed.data.addressType,
                validFrom: parsed.data.validFrom,
            },
        });
        if (!address) {
            return {
                status: 'error',
                message: 'Address not found',
                error: 'Record not found',
                data: null,
            };
        }
        const deletedAddress = await db.userAddress.delete({
            where: {
                userId_addressType_validFrom: {
                    userId: address.userId,
                    addressType: address.addressType,
                    validFrom: address.validFrom,
                },
            },
        });
        return {
            status: 'success',
            message: 'Address deleted successfully',
            data: convertToAddress(deletedAddress),
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                status: 'error',
                message: 'Failed to delete address',
                error: error.message,
                data: null,
            };
        }
        throw error;
    }
});
