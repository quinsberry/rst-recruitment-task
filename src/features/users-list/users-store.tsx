import { createContext, useContext, useState } from 'react';
import { User } from '@/entities/user';

interface UsersStore<T extends User> {
    users: T[];
    addUser: (user: T) => void;
    updateUser: (user: T) => void;
    deleteUser: (user: T) => void;
}
const UsersStoreContext = createContext<UsersStore<User> | null>(null);

interface UsersProviderProps<T extends User> {
    initialUsers: T[];
    children: React.ReactNode;
}

export const UsersProvider = <T extends User>({ initialUsers, children }: UsersProviderProps<T>) => {
    const [users, setUsers] = useState<T[]>(initialUsers);

    const addUser = (user: T) => {
        setUsers((prev) => [...prev, user]);
    };

    const updateUser = (user: T) => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    };

    const deleteUser = (user: T) => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
    };

    return (
        // @ts-ignore TODO: fix this
        <UsersStoreContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UsersStoreContext.Provider>
    );
};

export const useUsersStore = <T extends User>() => {
    const store = useContext(UsersStoreContext) as any as UsersStore<T>;
    if (!store) {
        throw new Error('useUsersStore must be used within a UsersProvider');
    }
    return store;
};
