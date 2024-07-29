import React from 'react';
import SideMenu from './ui/SideMenu';
import { Link } from 'react-router-dom';
import SidebarDivider from './ui/SidebarDivider';
import { useUserContext } from '../Context/UserContext';
import useOutsideClick from '../Hooks/useOutsideClick';
import { PiListThin } from 'react-icons/pi';
import { PiHouseLight } from 'react-icons/pi';
import { SiYoutubeshorts } from 'react-icons/si';

export default function Sidebar({ showSidebar, setShowSidebar }) {
    const { user } = useUserContext();
    const handleOutsideClick = () => {
        setShowSidebar(false);
    };
    const ref = useOutsideClick(handleOutsideClick);
    return (
        <aside
            ref={ref}
            className={`h-screen w-60 absolute top-0 -left-60 px-5 pt-2 -ml-5 z-50 overflow-scroll dark:bg-zinc-950 dark:text-gray-50 bg-zinc-50 text-gray-950
                ${!showSidebar ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className='flex'>
                <button
                    onClick={() => setShowSidebar(false)}
                    className='flex justify-center items-center shrink-0 size-10 active:bg-gray-200 dark:active:bg-zinc-800 rounded-full mr-4'
                >
                    <PiListThin className='size-6' />
                </button>

                <Link to='/' className='flex items-center static'>
                    <img
                        className='size-7'
                        alt='YouTube'
                        src='https://developers.google.com/static/site-assets/logo-youtube.svg'
                    />
                    <h1 className='ml-0.5 relative -top-0.5 font-logo font-medium tracking-tight text-xl'>
                        YouTube
                    </h1>
                </Link>
            </div>
            <div className='flex flex-col items-start mt-5'>
                <SideMenu text='Home' icon={<PiHouseLight />} />
                <SideMenu text='Shorts' icon={<SiYoutubeshorts />} />
                <SideMenu text='Subscription' />
                <SidebarDivider />
                {user && (
                    <>
                        <p className='font-bold my-1'>You</p>
                        <SideMenu text='History' />
                        <SideMenu text='Playlists' />
                        <SideMenu text='Watch later' />
                        <SideMenu text='Liked videos' />
                        <SidebarDivider />
                    </>
                )}
                <p className='font-bold my-1'>Explore</p>
                <SideMenu text='Trending' />
                <SideMenu text='Shopping' />
                <SideMenu text='Music' />
                <SideMenu text='Movies' />
                <SideMenu text='Live' />
                <SideMenu text='Gaming' />
                <SideMenu text='Sports' />
                <SideMenu text='Courses' />
                <SideMenu text='Podcasts' />
                <SidebarDivider />
            </div>
        </aside>
    );
}
