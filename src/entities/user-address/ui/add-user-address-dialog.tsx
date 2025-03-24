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
    userId: UserAddress['userId'];
    userName: string;
}

export const AddUserAddressDialog = ({ userId, userName }: UserAddressDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add new address</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add address</DialogTitle>
                    <DialogDescription>Add a new address for {userName}</DialogDescription>
                </DialogHeader>
                <UserAddressForm userId={userId} />
            </DialogContent>
        </Dialog>
    );
};
