import React from 'react';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import SidebarDivider from './SidebarDivider';
import { useUserContext } from '../Context/UserContext';
import useOutsideClick from '../Hooks/useOutsideClick';
import { PiListThin } from 'react-icons/pi';
import { ReactComponent as HomeIcon } from './icons/HomeIcon.svg';
import { ReactComponent as ShortsIcon } from './icons/ShortsIcon.svg';
import { ReactComponent as SubscriptionIcon } from './icons/SubscriptionIcon.svg';
import { ReactComponent as HistoryIcon } from './icons/HistoryIcon.svg';
import { ReactComponent as PlaylistsIcon } from './icons/PlaylistsIcon.svg';
import { ReactComponent as WatchLaterIcon } from './icons/WatchLaterIcon.svg';
import { ReactComponent as LikedVideosIcon } from './icons/LikedVideosIcon.svg';
import { ReactComponent as TrendingIcon } from './icons/TrendingIcon.svg';
import { ReactComponent as ShoppingIcon } from './icons/ShoppingIcon.svg';
import { ReactComponent as MusicIcon } from './icons/MusicIcon.svg';
import { ReactComponent as MoviesIcon } from './icons/MoviesIcon.svg';
import { ReactComponent as LiveIcon } from './icons/LiveIcon.svg';
import { ReactComponent as GamingIcon } from './icons/GamingIcon.svg';
import { ReactComponent as SportsIcon } from './icons/SportsIcon.svg';
import { ReactComponent as CoursesIcon } from './icons/CoursesIcon.svg';
import { ReactComponent as PodcastsIcon } from './icons/PodcastsIcon.svg';
import { ReactComponent as SettingsIcon } from './icons/SettingsIcon.svg';
import { ReactComponent as ReportHistoryIcon } from './icons/ReportHistoryIcon.svg';
import { ReactComponent as HelpIcon } from './icons/HelpIcon.svg';
import { ReactComponent as SendFeedbackIcon } from './icons/SendFeedbackIcon.svg';
import { ReactComponent as AllSubscriptionsIcon } from './icons/AllSubscriptionsIcon.svg';
import useSubscribe from '../Hooks/useSubscribe';
import SideMenuCategory from './SideMenuCategory';

export default function Sidebar({ setShowSidebar }) {
    const { user } = useUserContext();
    const handleOutsideClick = () => {
        setShowSidebar(false);
    };
    const ref = useOutsideClick(handleOutsideClick);
    const {
        subscriptionQuery: { data },
    } = useSubscribe();
    const subscriptions = data && Object.values(data);
    console.log(subscriptions);
    return (
        <aside
            ref={ref}
            className={`fixed top-0 left-0 lg:block h-full w-[15.5rem] pl-4 pr-5 pt-2 z-50 overflow-scroll dark:bg-zinc-950 bg-gray-50`}
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
                <SideMenu text='Home' icon={<HomeIcon />} />
                <SideMenu text='Shorts' icon={<ShortsIcon />} />
                <SideMenu text='Subscription' icon={<SubscriptionIcon />} />
                <SidebarDivider />
                {user && (
                    <>
                        <SideMenuCategory text='You' />
                        <SideMenu text='History' icon={<HistoryIcon />} />
                        <SideMenu text='Playlists' icon={<PlaylistsIcon />} />
                        <SideMenu
                            text='Watch later'
                            icon={<WatchLaterIcon />}
                        />
                        <SideMenu
                            text='Liked videos'
                            icon={<LikedVideosIcon />}
                        />
                        <SidebarDivider />
                        {subscriptions && subscriptions.length > 0 && (
                            <>
                                <SideMenuCategory text='Subscriptions' />
                                {subscriptions.length === 1 ? (
                                    <SideMenu
                                        text={subscriptions[0].snippet.title}
                                        thumbnail={
                                            subscriptions[0].snippet.thumbnails
                                                .default.url
                                        }
                                    />
                                ) : (
                                    subscriptions.map((channel) => (
                                        <SideMenu
                                            text={channel.snippet.title}
                                            thumbnail={
                                                channel.snippet.thumbnails
                                                    .default.url
                                            }
                                        />
                                    ))
                                )}
                                <SideMenu
                                    text='All subscription'
                                    icon={<AllSubscriptionsIcon />}
                                />
                                <SidebarDivider />
                            </>
                        )}
                    </>
                )}
                <SideMenuCategory text='Explore' />
                <SideMenu text='Trending' icon={<TrendingIcon />} />
                <SideMenu text='Shopping' icon={<ShoppingIcon />} />
                <SideMenu text='Music' icon={<MusicIcon />} />
                <SideMenu text='Movies' icon={<MoviesIcon />} />
                <SideMenu text='Live' icon={<LiveIcon />} />
                <SideMenu text='Gaming' icon={<GamingIcon />} />
                <SideMenu text='Sports' icon={<SportsIcon />} />
                <SideMenu text='Courses' icon={<CoursesIcon />} />
                <SideMenu text='Podcasts' icon={<PodcastsIcon />} />
                <SidebarDivider />
                <SideMenu text='Settings' icon={<SettingsIcon />} />
                <SideMenu text='Report history' icon={<ReportHistoryIcon />} />
                <SideMenu text='Help' icon={<HelpIcon />} />
                <SideMenu text='Send feedback' icon={<SendFeedbackIcon />} />
                <SidebarDivider />
            </div>
        </aside>
    );
}
