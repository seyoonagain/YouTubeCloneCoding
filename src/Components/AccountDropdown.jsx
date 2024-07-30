import React from 'react';
import { useUserContext } from '../Context/UserContext';
import SidebarDivider from './SidebarDivider';
import { PiSignInThin } from 'react-icons/pi';

export default function AccountDropdown({ setShowAccount }) {
    const {
        user: { displayName, email, photoURL },
        logout,
    } = useUserContext();
    const handleLogout = () => {
        logout();
        setShowAccount(false);
    };
    return (
        <div className='cursor-default absolute top-10 right-0 w-72 dark:bg-zinc-800 bg-gray-50 rounded-xl shadow-account dark:shadow-none'>
            <div className='flex items-center p-4'>
                <img
                    src={photoURL}
                    alt={displayName}
                    className='rounded-full size-10 mr-3'
                />
                <div>
                    <p className='font-medium'>{displayName}</p>
                    <p className='text-sm'>{email}</p>
                </div>
            </div>
            <SidebarDivider />
            <button
                onClick={handleLogout}
                className='w-full px-4 py-2 my-4 flex items-center hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-zinc-700 dark:active:bg-zinc-600'
            >
                <PiSignInThin className='size-6 mr-4' />
                <p className='text-sm'>Sign out</p>
            </button>
        </div>
    );
}
