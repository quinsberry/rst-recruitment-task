import { z } from 'zod';

export const iso3166Alpha3Pattern = /^[A-Z]{3}$/;
export const addressTypeScheme = z.union([
    z.literal('HOME'),
    z.literal('INVOICE'),
    z.literal('POST'),
    z.literal('WORK'),
]);
export const userAddressScheme = z.object({
    addressType: addressTypeScheme,
    postCode: z.string().length(6, { message: 'Post code must be exactly 6 characters long' }),
    city: z.string().min(1, { message: 'City is required' }),
    street: z.string().min(1, { message: 'Street is required' }),
    buildingNumber: z.string().min(1, { message: 'Building number is required' }),
    countryCode: z.string().regex(iso3166Alpha3Pattern, 'Invalid country code (ISO3166-1 alpha-3)'),
    validFrom: z.date(),
});
