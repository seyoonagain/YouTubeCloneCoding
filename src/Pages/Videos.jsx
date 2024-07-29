import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import VideoCard from '../Components/VideoCard';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import LoadingSpinner from '../Components/LoadingSpinner';
import Error from '../Components/Error';

export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery({
        queryKey: ['video', keyword && keyword],
        queryFn: async () => youtube.search(keyword),
        refetchOnWindowFocus: false,
    });
    return (
        <div className='flex justify-center'>
            {isLoading && <LoadingSpinner />}
            {error && <Error />}
            {!error && videos && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 list-none'>
                    {videos &&
                        videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                </ul>
            )}
        </div>
    );
}
