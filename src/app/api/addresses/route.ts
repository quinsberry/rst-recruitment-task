import { db } from '@/shared/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    try {
        const addresses = await db.userAddress.findMany({
            where: {
                userId: parseInt(userId),
            },
        });
        return NextResponse.json({
            data: addresses,
        });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
