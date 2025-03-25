'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { FunctionComponent, useActionState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { addressTypeScheme, userAddressScheme } from '@/shared/validators/user-address-scheme';
import { Address } from '../model';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { DatePicker } from '@/shared/components/ui/date-picker';
import { Action } from '@/shared/lib/actions';

interface AddressFormProps {
    userId: Address['userId'];
    data?: Address;
    action: Action<Address, FormData>;
    onSubmit: (data: Address) => void;
}

export const AddressForm: FunctionComponent<AddressFormProps> = ({ action, onSubmit, userId, data }) => {
    const [state, formAction, isPending] = useActionState(action, {
        message: '',
        status: 'idle',
        data: data ?? null,
    });

    const form = useForm<z.infer<typeof userAddressScheme>>({
        defaultValues: {
            addressType: data?.addressType ?? 'HOME',
            postCode: data?.postCode ?? '',
            city: data?.city ?? '',
            street: data?.street ?? '',
            buildingNumber: data?.buildingNumber ?? '',
            countryCode: data?.countryCode ?? '',
            validFrom: data?.validFrom ?? new Date(),
        },
    });
    const street = form.watch('street');
    const buildingNumber = form.watch('buildingNumber');
    const postCode = form.watch('postCode');
    const city = form.watch('city');
    const countryCode = form.watch('countryCode');
    const showAddressPreview = street && buildingNumber && postCode && city && countryCode;

    useEffect(() => {
        if (state.status === 'success') {
            onSubmit?.(state.data);
        } else if (state.status === 'validationError') {
            Object.entries(state.validationErrors.fieldErrors).forEach(([field, error]) => {
                form.setError(field as keyof z.infer<typeof userAddressScheme>, { message: error.join(', ') });
            });
        }
    }, [state.status]);
    const handleAction = async (formData: FormData) => {
        formData.append('userId', userId.toString());
        formData.append('validFrom', form.getValues('validFrom').toDateString());
        formAction(formData);
    };

    return (
        <Form {...form}>
            <form action={handleAction} className="space-y-6">
                <FormField
                    control={form.control}
                    name="addressType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address type</FormLabel>
                            <Select onValueChange={field.onChange} {...field}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select user status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {addressTypeScheme.options.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.value}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country Code</FormLabel>
                            <FormControl>
                                <Input placeholder="USA" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Post Code</FormLabel>
                            <FormControl>
                                <Input placeholder="xxxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="New-York" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input placeholder="Nostrand Ave" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="buildingNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Building Number</FormLabel>
                            <FormControl>
                                <Input placeholder="642" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="validFrom"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Valid from</FormLabel>
                            <DatePicker date={field.value} setDate={field.onChange} {...field} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {showAddressPreview && (
                    <div className="mt-4 p-4 border rounded-md">
                        <h3 className="font-semibold mb-2">Address Preview</h3>
                        <div className="space-y-1 text-sm">
                            <p>
                                {street} {buildingNumber}
                            </p>
                            <p>
                                {postCode} {city}
                            </p>
                            <p>{countryCode}</p>
                        </div>
                    </div>
                )}
                {state.status === 'error' && <p className="text-destructive text-center">{state.message}</p>}
                <Button type="submit" className="w-full" isInProgress={isPending}>
                    Save
                </Button>
            </form>
        </Form>
    );
};
