import React from 'react';

export default function SideMenu({ text, icon, thumbnail }) {
    return (
        <li className='w-full h-10 flex rounded-lg py-1 items-center hover:bg-gray-200 dark:hover:bg-zinc-700 active:brightness-90 dark:active:brightness-125 cursor-pointer'>
            {icon && (
                <div className='size-10 mr-4 fill-zinc-900 dark:fill-gray-50'>
                    {icon}
                </div>
            )}
            {thumbnail && (
                <img
                    src={thumbnail}
                    alt='thumbnail'
                    className='size-10 rounded-full mr-4 p-2'
                />
            )}
            <p className='text-sm'>{text}</p>
        </li>
    );
}
