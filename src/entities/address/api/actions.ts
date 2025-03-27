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
            data: prevState.data,
        };
    }

    if (!prevState.data) {
        throw new Error('Data from previous state is missing');
    }

    try {
        const validFromDate = new Date(prevState.data.validFrom);
        const startOfSecond = new Date(validFromDate.setMilliseconds(0));
        const endOfSecond = new Date(validFromDate.setMilliseconds(999));

        const [userAddress] = await db.userAddress.updateManyAndReturn({
            where: {
                userId: parseInt(formData.userId as string),
                addressType: prevState.data.addressType,
                validFrom: {
                    gte: startOfSecond,
                    lte: endOfSecond,
                },
            },
            data: parsed.data,
        });

        if (!userAddress) {
            return {
                status: 'error',
                message: 'Address not found',
                error: 'Record not found',
                data: prevState.data,
            };
        }

        return {
            status: 'success',
            message: 'Address updated successfully',
            data: convertToAddress(userAddress),
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return {
                status: 'error',
                message: 'Failed to update address',
                error: error.message,
                data: prevState.data,
            };
        }
        throw error;
    }
});

export const deleteAddressAction = createAction<null, FormData>(async (prevState, data) => {
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
        const validFromDate = new Date(parsed.data.validFrom);
        const startOfSecond = new Date(validFromDate.setMilliseconds(0));
        const endOfSecond = new Date(validFromDate.setMilliseconds(999));

        const deletedAddress = await db.userAddress.deleteMany({
            where: {
                userId: parseInt(formData.userId as string),
                addressType: parsed.data.addressType,
                validFrom: {
                    gte: startOfSecond,
                    lte: endOfSecond,
                },
            },
        });

        if (deletedAddress.count === 0) {
            return {
                status: 'error',
                message: 'Address not found',
                error: 'Record not found',
                data: null,
            };
        }

        return {
            status: 'success',
            message: 'Address deleted successfully',
            data: null,
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
