'use server';

import { db } from '@/shared/lib/db';

export const getUsers = async () => {
    const response = await db.user.findMany();
    return response;
};
