import { User } from '@/entities/user';
import { Button } from '@/shared/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog';
import { AddressForm } from '@/entities/address';
import { useUserAddressesStore } from './user-addresses-store';

export const AddUserAddressDialog = () => {
    const { user, addAddress } = useUserAddressesStore();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add address</DialogTitle>
                    <DialogDescription>Add a new address for {user.fullName}</DialogDescription>
                </DialogHeader>
                <AddressForm userId={user.id} onSubmit={addAddress} />
            </DialogContent>
        </Dialog>
    );
};
