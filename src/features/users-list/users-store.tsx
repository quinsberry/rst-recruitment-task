import { createContext, useContext, useState } from 'react';
import { User } from '@/entities/user';

interface UsersStore {
    users: User[];
    addUser: (user: User) => void;
    updateUser: (user: User) => void;
    deleteUser: (user: User) => void;
}
const UsersStoreContext = createContext<UsersStore | null>(null);

interface UsersProviderProps {
    initialUsers: User[];
    children: React.ReactNode;
}

export const UsersProvider = ({ initialUsers, children }: UsersProviderProps) => {
    const [users, setUsers] = useState<User[]>(initialUsers);

    const addUser = (user: User) => {
        setUsers((prev) => [...prev, user]);
    };

    const updateUser = (user: User) => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    };

    const deleteUser = (user: User) => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id));
    };

    return (
        <UsersStoreContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
            {children}
        </UsersStoreContext.Provider>
    );
};

export const useUsersStore = () => {
    const store = useContext(UsersStoreContext);
    if (!store) {
        throw new Error('useUsersStore must be used within a UsersProvider');
    }
    return store;
};
