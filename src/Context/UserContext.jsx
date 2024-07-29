import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../API/firebase';

const UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(readUserFromLocalStorage);
    useEffect(() => {
        onUserStateChange(setUser);
    }, []);
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

function readUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const useUserContext = () => useContext(UserContext);
