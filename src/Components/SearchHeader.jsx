import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDarkMode } from '../Context/DarkModeContext';
import { CiSearch } from 'react-icons/ci';
import { IoSunnySharp, IoMoonSharp } from 'react-icons/io5';
import { IoMdArrowBack } from 'react-icons/io';
import { PiUserCircleLight, PiListThin } from 'react-icons/pi';
import InputOnOffButton from './InputOnOffButton';
import AccountDropdown from './AccountDropdown';
import { useUserContext } from '../Context/UserContext';
import useOutsideClick from '../Hooks/useOutsideClick';
import Sidebar from './Sidebar';
import Logo from './Logo';

const TOGGLE_BUTTON_STYLE =
    'size-5 hover:text-youtube transition-all duration-200';

export default function SearchHeader() {
    const { user, login } = useUserContext();
    const handleOutsideClick = () => {
        setShowAccountDropdown(false);
    };
    const ref = useOutsideClick(handleOutsideClick);
    const [text, setText] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showAccountDropdown, setShowAccountDropdown] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { keyword } = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/videos/${text}`);
        setShowInput(false);
    };
    const handleSidebar = () => setShowSidebar(!showSidebar);
    useEffect(() => setText(keyword || ''), [keyword]);
    return (
        <header
            className={`relative w-full bg-zinc-50 dark:bg-zinc-950 flex pt-2 pb-3 items-center z-1 ${
                !showInput && 'justify-between'
            }`}
        >
            <div
                className={`flex ${
                    showInput && 'hidden sm:flex items-center static'
                }`}
            >
                {showSidebar && (
                    <div className='absolute top-0 left-0 bg-black w-screen h-screen -ml-4 opacity-30 z-50'></div>
                )}
                <button
                    onClick={handleSidebar}
                    className='flex justify-center items-center shrink-0 size-10 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-full mr-4 z-1'
                >
                    <PiListThin className='size-6' />
                </button>
                <Logo />
                <Sidebar
                    setShowSidebar={setShowSidebar}
                    showSidebar={showSidebar}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={` ${
                    !showInput && 'hidden sm:flex'
                } w-full flex justify-center items-center`}
            >
                <div className='absolute top-2 -left-2'>
                    <InputOnOffButton
                        onClick={() => setShowInput(!showInput)}
                        showInput={!showInput}
                        icon={<IoMdArrowBack className='size-6' />}
                    />
                </div>
                <input
                    type='text'
                    className='h-10 w-8/12 sm:w-6/12 rounded-l-full bg-zinc-50 dark:bg-zinc-950 outline-none border border-zinc-300 dark:border-zinc-700 pl-4 focus:border-blue-600'
                    placeholder='Search'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className='flex justify-center items-center h-10 w-16 rounded-r-full bg-zinc-100 dark:bg-zinc-800 border border-l-0 border-zinc-300 dark:border-zinc-700'>
                    <CiSearch className='size-6' />
                </button>
            </form>
            <div className='flex items-center'>
                <InputOnOffButton
                    onClick={() => setShowInput(!showInput)}
                    showInput={showInput}
                    icon={<CiSearch className='size-6' />}
                />

                {!showInput && (
                    <>
                        <button
                            className='size-10 flex justify-center items-center'
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? (
                                <IoMoonSharp className={TOGGLE_BUTTON_STYLE} />
                            ) : (
                                <IoSunnySharp className={TOGGLE_BUTTON_STYLE} />
                            )}
                        </button>
                        {!user && (
                            <button
                                onClick={login}
                                className='rounded-full border border-zinc-300 dark:border-zinc-700 h-9 w-24 px-1 flex justify-center items-center text-sky-700 dark:text-sky-500 text-sm font-semibold hover:bg-sky-100 hover:border-transparent active:brightness-90 dark:hover:bg-sky-950 dark:active:bg-sky-900'
                            >
                                <PiUserCircleLight className='size-7 mr-1' />
                                <p>Sign in</p>
                            </button>
                        )}
                        {user && (
                            <div ref={ref} className='relative'>
                                <button
                                    onClick={() =>
                                        setShowAccountDropdown(
                                            !showAccountDropdown
                                        )
                                    }
                                    className='size-10 flex justify-center items-center shrink-0'
                                >
                                    <img
                                        className='size-8 rounded-full '
                                        src={user.photoURL}
                                        alt={user.uid}
                                    />
                                </button>
                                {showAccountDropdown && (
                                    <AccountDropdown
                                        setShowAccount={setShowAccountDropdown}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}
