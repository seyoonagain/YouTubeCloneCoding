import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'timeago.js';
import { RxDotsVertical } from 'react-icons/rx';
import { useDarkMode } from '../Context/DarkModeContext';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import { useNavigate } from 'react-router-dom';

export default function VideoCard({ video, type }) {
    const { darkMode } = useDarkMode();
    const { youtube } = useYoutubeApi();
    const navigate = useNavigate();
    const isList = type === 'list';
    const { channelId, channelTitle, publishedAt, thumbnails, title } =
        video.snippet;
    const viewCount = video.statistics && video.statistics.viewCount;
    const { data: channel } = useQuery({
        queryKey: ['channel', channelId],
        queryFn: () => youtube.channelInfo(channelId),
        refetchOnWindowFocus: false,
    });
    const channelThumbnail = channel && channel.snippet.thumbnails.default.url;

    return (
        <li
            className={`flex max-w-lg ${
                isList ? 'flex-row mb-1' : 'flex-col mb-8'
            }  mx-2 tracking-tight`}
        >
            <img
                className={`rounded-xl cursor-pointer ${
                    isList ? 'w-4/12 lg:w-5/12 mr-2' : 'mb-3'
                }`}
                alt='videoThumbnail'
                src={thumbnails.medium.url}
                onClick={() =>
                    navigate(`/videos/watch/${video.id}`, {
                        state: { channel },
                    })
                }
            />

            <div
                className={`flex items-start relative ${
                    isList ? 'w-8/12 lg:w-7/12' : ''
                }`}
            >
                {!isList && (
                    <img
                        className='shrink-0 size-10 mr-3 rounded-full cursor-pointer'
                        alt='channelThumbnail'
                        src={channelThumbnail}
                    />
                )}
                <div>
                    <p
                        className={`font-semibold ${
                            isList
                                ? 'mb-2 lg:mb-1 lg:text-dsc lg:break-all'
                                : 'mb-1'
                        } leading-5 line-clamp-2 pr-7 cursor-pointer`}
                        onClick={() =>
                            navigate(`/videos/watch/${video.id}`, {
                                state: { channel },
                            })
                        }
                    >
                        {title.replace(/&#39;/gm, "'")}
                    </p>

                    <p
                        className={`${
                            isList ? 'text-xs leading-3' : 'text-sm leading-5'
                        } opacity-70 cursor-pointer`}
                    >
                        {channelTitle}
                    </p>
                    <p
                        className={`${
                            isList ? 'text-xs' : 'text-sm'
                        } opacity-70 font-title cursor-pointer`}
                    >
                        {!viewCount
                            ? ''
                            : viewCount > 1000000
                            ? `${Math.floor(viewCount / 100000) / 10}M`
                            : viewCount > 1000
                            ? `${Math.floor(viewCount / 1000)}K`
                            : viewCount}
                        {viewCount && ' views • '}
                        {format(publishedAt)}
                    </p>
                </div>
                <button
                    className={`absolute -right-3 -mt-2 flex justify-center items-center size-10 rounded-full active:transition ${
                        darkMode
                            ? 'active:bg-zinc-800 duration-700'
                            : 'active:bg-zinc-300 active:border-2 active:border-zinc-300  duration-500'
                    }`}
                >
                    <RxDotsVertical className='size-5' />
                </button>
            </div>
        </li>
    );
}
