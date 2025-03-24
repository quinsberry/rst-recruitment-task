'use server';

import { userAddressScheme } from '@/shared/validators/user-address-scheme';
import { db } from '@/shared/lib/db';

export const addUserAddressAction = async (prevState: any, data: FormData) => {
    const formData = Object.fromEntries(data);
    const parsed = userAddressScheme.safeParse(formData);
};
