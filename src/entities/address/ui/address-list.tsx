import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { FunctionComponent } from 'react';
import { Address } from '../model';

interface AddressListProps {
    addresses: Address[];
    RowAction: FunctionComponent<{ address: Address }>;
}

export const AddressList: FunctionComponent<AddressListProps> = ({ addresses, RowAction }) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Country Code</TableHead>
                        <TableHead>PostCode</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Street</TableHead>
                        <TableHead>Building number</TableHead>
                        <TableHead>Valid From</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {addresses.length > 0 ? (
                        addresses.map((address) => (
                            <TableRow key={address.id} className="cursor-pointer hover:bg-muted/50 h-10">
                                <TableCell>{address.addressType}</TableCell>
                                <TableCell className="text-center">{address.countryCode}</TableCell>
                                <TableCell>{address.postCode}</TableCell>
                                <TableCell>{address.city}</TableCell>
                                <TableCell>{address.street}</TableCell>
                                <TableCell className="text-center">{address.buildingNumber}</TableCell>
                                <TableCell>{address.validFrom.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <RowAction address={address} />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={10} className="h-10 text-center">
                                No addresses found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
