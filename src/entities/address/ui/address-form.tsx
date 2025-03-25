'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { FunctionComponent, useActionState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { addressTypeScheme, userAddressScheme } from '@/shared/validators/user-address-scheme';
import { Address } from '../model';
import { addAddressAction } from '../api/actions';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { DatePicker } from '@/shared/components/ui/date-picker';

interface AddressFormProps extends Partial<Omit<Address, 'id' | 'createdAt' | 'updatedAt'>> {
    userId: Address['userId'];
    onSubmit: (data: Address) => void;
}

export const AddressForm: FunctionComponent<AddressFormProps> = (props) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction, isPending] = useActionState(addAddressAction, {
        message: '',
        status: 'idle',
    });

    const form = useForm<z.infer<typeof userAddressScheme>>({
        resolver: zodResolver(userAddressScheme),
        defaultValues: {
            addressType: props.addressType ?? 'HOME',
            postCode: props.postCode ?? '',
            city: props.city ?? '',
            street: props.street ?? '',
            buildingNumber: props.buildingNumber ?? '',
            countryCode: props.countryCode ?? '',
            validFrom: props.validFrom ?? new Date(),
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
            props.onSubmit?.(state.data);
        }
    }, [state.status]);

    const handleSubmit = form.handleSubmit(async () => {
        const formData = new FormData(formRef.current!);
        formData.append('userId', props.userId.toString());
        formAction(formData);
    });

    return (
        <Form {...form}>
            <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="space-y-6">
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
                            <DatePicker date={field.value} setDate={field.onChange} />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {showAddressPreview && (
                    <div className="mt-4 p-4 border rounded-md">
                        <h3 className="font-semibold mb-2">Address Preview</h3>
                        <div className="space-y-1 text-sm">
                            <p>
                                {street}, {buildingNumber}
                            </p>
                            <p>
                                {postCode} {city}
                            </p>
                            <p>{countryCode}</p>
                        </div>
                    </div>
                )}
                <Button type="submit" className="" isInProgress={isPending}>
                    Add
                </Button>
            </form>
        </Form>
    );
};
