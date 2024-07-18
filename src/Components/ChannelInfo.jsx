import React from 'react';

export default function ChannelInfo({ channel }) {
    const { title: channelTitle, thumbnails } = channel && channel.snippet;
    const { subscriberCount } = channel && channel.statistics;
    return (
        <div className='flex items-center'>
            {channel && (
                <img
                    className='size-11 rounded-full mr-3'
                    alt='channelThumbnail'
                    src={thumbnails.medium.url}
                />
            )}
            <div className='flex flex-col h-9 mr-7'>
                <p className='font-bold tracking-tight'>{channelTitle}</p>
                <p className='font-medium text-xs opacity-70'>
                    {subscriberCount > 1000000
                        ? `${Math.floor(subscriberCount / 100000) / 10}M`
                        : subscriberCount > 1000
                        ? `${Math.floor(subscriberCount / 1000)}K`
                        : subscriberCount}{' '}
                    subscribers
                </p>
            </div>
        </div>
    );
}
