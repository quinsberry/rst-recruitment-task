import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Address } from '@/entities/address';
import { AddressForm } from '@/entities/address';
import { useUserAddressesStore } from './user-addresses-store';

interface UserAddressDialogProps {
    address: Address;
    userName: string;
}

export const EditUserAddressDialog = ({ address, userName }: UserAddressDialogProps) => {
    const { updateAddress } = useUserAddressesStore();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'} className="w-full">
                    Edit address
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit address</DialogTitle>
                    <DialogDescription>Edit address for {userName}</DialogDescription>
                </DialogHeader>
                <AddressForm
                    onSubmit={updateAddress}
                    userId={address.userId}
                    addressType={address.addressType}
                    countryCode={address.countryCode}
                    postCode={address.postCode}
                    city={address.city}
                    street={address.street}
                    buildingNumber={address.buildingNumber}
                    validFrom={address.validFrom}
                />
            </DialogContent>
        </Dialog>
    );
};
