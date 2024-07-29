import React from 'react';

export default function SideMenu({ text, icon }) {
    return (
        <button className='w-full h-10 flex rounded-lg py-1 items-center hover:bg-gray-200 dark:hover:bg-zinc-700 active:brightness-90 dark:active:brightness-125'>
            <span className='size-10 text-xl mr-4 flex justify-center items-center'>
                {icon}
            </span>
            <p className='text-sm'>{text}</p>
        </button>
    );
}
