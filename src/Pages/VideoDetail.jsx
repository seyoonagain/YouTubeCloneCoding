import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApiContext } from '../Context/YoutubeApiContext';
import CommentSection from '../Components/CommentSection';
import { PiShareFatLight } from 'react-icons/pi';
import { RxDotsHorizontal } from 'react-icons/rx';
import ChannelInfo from '../Components/ChannelInfo';
import LikeButton from '../Components/LikeButton';
import VideoDescription from '../Components/VideoDescription';
import VideoCard from '../Components/VideoCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import Error from '../Components/Error';
import { useUserContext } from '../Context/UserContext';
import useSubscribe from '../Hooks/useSubscribe';

export default function VideoDetail() {
    const { user } = useUserContext();
    const {
        subscriptionQuery: { data },
        addChannel,
        removeChannel,
    } = useSubscribe();
    const subscription = data && Object.keys(data);
    const { videoId } = useParams();
    const { youtube } = useYoutubeApiContext();
    const { state } = useLocation();
    const { channel } = state && state;
    const [subscribed, setSubscribed] = useState(
        subscription && subscription.includes(channel.id)
    );
    const {
        isLoading,
        error,
        data: videoInfo,
    } = useQuery({
        queryKey: ['videoInfo', videoId],
        queryFn: () => youtube.videoInfo(videoId),
        refetchOnWindowFocus: false,
    });
    const { data: relatedVideos } = useQuery({
        queryKey: ['relate', channel.id],
        queryFn: () => youtube.relatedVideo(channel.id),
        refetchOnWindowFocus: false,
    });

    const handleSubscribe = () => {
        if (user) {
            if (subscribed) {
                removeChannel.mutate(channel);
                setSubscribed(!subscribed);
            } else {
                addChannel.mutate(channel);
                setSubscribed(!subscribed);
            }
        } else {
            alert('Sign in to subscribe.');
        }
    };
    return (
        <section className='flex justify-center lg:flex-row flex-col mt-5'>
            {isLoading && <LoadingSpinner />}
            {error && <Error />}
            {videoInfo && (
                <>
                    <article className='w-full lg:basis-8/12 lg:mr-3'>
                        <iframe
                            id='player'
                            title='video'
                            type='text/html'
                            className='mb-3 rounded-2xl w-full aspect-video'
                            src={`//www.youtube.com/embed/${videoId}`}
                            allow='autoplay'
                        ></iframe>

                        <h1 className='font-extrabold font-roboto text-xl tracking-tight'>
                            {videoInfo.snippet.title}
                        </h1>

                        <div className='flex sm:flex-row flex-col sm:relative sm:items-center sm:justify-normal font-roboto mt-2 mb-3'>
                            <div className='flex items-center mb-2 sm:mb-0 justify-between sm:justify-normal'>
                                <ChannelInfo channel={channel} />
                                <button
                                    onClick={handleSubscribe}
                                    className={`w-24 h-9 rounded-full text-sm font-semibold ${
                                        subscribed
                                            ? 'bg-gray-200 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                                            : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                    } hover:opacity-90  active:bg-youtube active:transition duration-500`}
                                >
                                    {subscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            </div>
                            <div className='flex sm:absolute sm:right-0 h-9 justify-end'>
                                {videoInfo && (
                                    <LikeButton
                                        likeCount={
                                            videoInfo.statistics.likeCount
                                        }
                                    />
                                )}
                                <button className='flex items-center justify-center w-24 rounded-full text-sm font-semibold bg-gray-200 dark:bg-zinc-800 border-r border-r-zinc-300 dark:border-r-zinc-700 hover:brightness-95 dark:hover:brightness-125 active:brightness-90 dark:active:brightness-150  mx-2'>
                                    <PiShareFatLight className='size-5 mr-2' />
                                    Share
                                </button>
                                <button className='flex items-center justify-center size-9 rounded-full bg-gray-200 dark:bg-zinc-800 border-r border-r-zinc-300 dark:border-r-zinc-700 hover:brightness-95 dark:hover:brightness-125 active:brightness-90 dark:active:brightness-150 '>
                                    <RxDotsHorizontal className='size-5' />
                                </button>
                            </div>
                        </div>
                        <VideoDescription video={videoInfo} />
                        <CommentSection
                            videoInfo={videoInfo}
                            videoId={videoId}
                        />
                    </article>

                    <section className='lg:basis-4/12 w-full list-none'>
                        <div className='h-px bg-gray-200 dark:bg-zinc-800 mb-2'></div>
                        {relatedVideos &&
                            relatedVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    type='list'
                                />
                            ))}
                    </section>
                </>
            )}
        </section>
    );
}
