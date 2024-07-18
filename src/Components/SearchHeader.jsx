import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';
import { CiSearch } from 'react-icons/ci';
import { IoSunnySharp, IoMoonSharp } from 'react-icons/io5';

export default function SearchHeader() {
    const [text, setText] = useState('');
    const [input, setInput] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { keyword } = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/videos/${text}`);
        setInput(false);
    };
    useEffect(() => setText(keyword || ''), [keyword]);
    return (
        <header
            className={`w-full bg-zinc-50 dark:bg-zinc-950 flex pt-2 pb-3 items-center z-50 ${
                !input && 'justify-between'
            }`}
        >
            <Link
                to='/'
                className={`${
                    input
                        ? 'hidden sm:flex items-center static'
                        : 'flex items-center static'
                }`}
            >
                <img
                    className='size-7 relative top-0.5'
                    alt='YouTube'
                    src='https://developers.google.com/static/site-assets/logo-youtube.svg'
                />
                <h1 className='ml-0.5 font-logo font-medium tracking-tight text-xl'>
                    YouTube
                </h1>
            </Link>

            <form
                onSubmit={handleSubmit}
                className={` ${
                    !input && 'hidden sm:flex'
                } w-full flex justify-center items-center'
                }
                `}
            >
                <input
                    type='text'
                    className='h-10 sm:w-2/5 w-3/5 rounded-l-full bg-zinc-50 dark:bg-zinc-950 outline-none border border-zinc-300 dark:border-zinc-700 pl-4 focus:border-blue-600 transition-all duration-200 '
                    placeholder='Search'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className='flex justify-center items-center h-10 w-16 rounded-r-full bg-zinc-100 dark:bg-zinc-800 border border-l-0 border-zinc-300 dark:border-zinc-700 transition-all duration-200 '>
                    <CiSearch className='size-6' />
                </button>
            </form>
            <div className='flex items-center'>
                <button
                    onClick={() => setInput(!input)}
                    className={`${
                        !input
                            ? 'sm:hidden flex justify-center items-center h-10 w-10 rounded-full shrink-0 mr-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200'
                            : 'hidden'
                    } `}
                >
                    <CiSearch className='size-5 active:size-6 transition-all duration-200' />
                </button>

                <button
                    className='size-6 justify-center items-center'
                    onClick={toggleDarkMode}
                >
                    {darkMode ? (
                        <IoMoonSharp className='size-4 active:text-youtube hover:size-5 transition-all duration-200' />
                    ) : (
                        <IoSunnySharp className='size-4 active:text-youtube hover:size-5 transition-all duration-200' />
                    )}
                </button>
            </div>
        </header>
    );
}
