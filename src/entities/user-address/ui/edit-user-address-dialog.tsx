import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import { UserAddress } from '../model';
import { UserAddressForm } from './user-address-form';

interface UserAddressDialogProps {
    address: UserAddress;
    userName: string;
}

export const EditUserAddressDialog = ({ address, userName }: UserAddressDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'ghost'}>Edit address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit address</DialogTitle>
                    <DialogDescription>Edit address for {userName}</DialogDescription>
                </DialogHeader>
                <UserAddressForm
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
