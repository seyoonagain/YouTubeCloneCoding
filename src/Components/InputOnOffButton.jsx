import React from 'react';

export default function InputOnOffButton({ icon, onClick, showInput }) {
    return (
        <button
            onClick={onClick}
            className={`${
                !showInput
                    ? 'sm:hidden flex justify-center items-center size-10 rounded-full shrink-0 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all duration-200'
                    : 'hidden'
            } `}
        >
            {icon}
        </button>
    );
}
