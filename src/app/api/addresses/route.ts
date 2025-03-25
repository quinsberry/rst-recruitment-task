import { Address } from '@/entities/address/model';
import { db } from '@/shared/lib/db';
import { addressTypeScheme } from '@/shared/validators/user-address-scheme';
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
            data: addresses.map((address) => ({
                ...address,
                id: getAddressId(address as Address),
                addressType: addressTypeScheme.parse(address.addressType),
            })),
        });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    const addressType = req.nextUrl.searchParams.get('addressType');
    const validFrom = req.nextUrl.searchParams.get('validFrom');
    if (!userId || !addressType || !validFrom) {
        return NextResponse.json({ error: 'Address ID is required' }, { status: 400 });
    }
    try {
        const address = await db.userAddress.findFirst({
            where: {
                userId: parseInt(userId),
                addressType,
                validFrom: new Date(validFrom),
            },
        });
        if (!address) {
            return NextResponse.json({ error: 'Address not found' }, { status: 404 });
        }
        await db.userAddress.delete({
            where: {
                userId_addressType_validFrom: {
                    userId: parseInt(userId),
                    addressType,
                    validFrom: new Date(validFrom),
                },
            },
        });
        return NextResponse.json(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}

function getAddressId(address: Omit<Address, 'id'>): string {
    return `${address.userId}-${address.addressType}-${address.validFrom}`;
}
