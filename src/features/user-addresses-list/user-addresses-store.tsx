import { createContext, useContext, useEffect, useState } from 'react';
import { Address, getUserAddresses } from '@/entities/address';
import { User } from '@/entities/user';

interface UserAddressesStore {
    addresses: Address[];
    user: User;
    addAddress: (address: Address) => void;
    updateAddress: (id: string, address: Address) => void;
    deleteAddress: (address: Address) => void;
}

const UserAddressesStoreContext = createContext<UserAddressesStore | null>(null);

interface UserAddressesProviderProps {
    initialAddresses: Address[];
    user: User;
    children: React.ReactNode;
}

export const UserAddressesProvider = ({ initialAddresses, user, children }: UserAddressesProviderProps) => {
    const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

    useEffect(() => {
        getUserAddresses(user.id).then((addresses) => {
            setAddresses(addresses);
        });
    }, [user.id]);

    const addAddress = (address: Address) => {
        setAddresses((prev) => [...prev, address]);
    };
    const updateAddress = (id: string, address: Address) => {
        setAddresses((prev) => prev.map((a) => (a.id === id ? address : a)));
    };
    const deleteAddress = (address: Address) => {
        setAddresses((prev) => prev.filter((a) => a.id !== address.id));
    };

    return (
        <UserAddressesStoreContext.Provider value={{ user, addresses, addAddress, updateAddress, deleteAddress }}>
            {children}
        </UserAddressesStoreContext.Provider>
    );
};

export const useUserAddressesStore = () => {
    const store = useContext(UserAddressesStoreContext);
    if (!store) {
        throw new Error('useUserAddressesStore must be used within a UserAddressesProvider');
    }
    return store;
};
