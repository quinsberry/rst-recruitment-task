'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/shared/components/ui/form';
import { FunctionComponent, useActionState, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { userAddressScheme } from '@/shared/validators/user-address-scheme';
import { UserAddress } from '../model';
import { addUserAddressAction } from '../api/action';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { DatePicker } from '@/shared/components/ui/date-picker';

interface UserAddressFormProps extends Partial<Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>> {
    userId: UserAddress['userId'];
}

export const UserAddressForm: FunctionComponent<UserAddressFormProps> = ({
    userId,
    addressType,
    countryCode,
    postCode,
    city,
    street,
    buildingNumber,
    validFrom,
}) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState(addUserAddressAction, {
        message: '',
    });

    const form = useForm<z.infer<typeof userAddressScheme>>({
        resolver: zodResolver(userAddressScheme),
        defaultValues: {
            addressType: addressType ?? 'HOME',
            postCode: postCode ?? '',
            city: city ?? '',
            street: street ?? '',
            buildingNumber: buildingNumber ?? '',
            countryCode: countryCode ?? '',
            validFrom: validFrom ?? new Date(),
        },
    });
    const handleSubmit = form.handleSubmit(() => {
        const formData = new FormData(formRef.current!);
        formData.append('userId', userId.toString());
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
                                    <SelectItem value="HOME">Home</SelectItem>
                                    <SelectItem value="INVOICE">Invoice</SelectItem>
                                    <SelectItem value="POST">Post</SelectItem>
                                    <SelectItem value="WORK">Work</SelectItem>
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
                <Button type="submit" className="">
                    Add
                </Button>
            </form>
        </Form>
    );
};
