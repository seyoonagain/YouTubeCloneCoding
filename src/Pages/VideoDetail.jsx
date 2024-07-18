import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import CommentSection from '../Components/CommentSection';
import { PiShareFatLight } from 'react-icons/pi';
import { RxDotsHorizontal } from 'react-icons/rx';
import ChannelInfo from '../Components/ChannelInfo';
import LikeButton from '../Components/LikeButton';
import VideoDescription from '../Components/VideoDescription';
import VideoCard from '../Components/VideoCard';
import LoadingSpinner from '../Components/LoadingSpinner';
import Error from '../Components/Error';

export default function VideoDetail() {
    const { videoId } = useParams();
    const { youtube } = useYoutubeApi();
    const { state } = useLocation();
    const { channel } = state;
    const [subscribed, setSubscribed] = useState(false);
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

                        <div className='flex relative items-center font-roboto mt-2 mb-3'>
                            <ChannelInfo channel={channel} />
                            <button
                                onClick={() => setSubscribed(!subscribed)}
                                className={`w-24 h-9 rounded-full text-sm font-semibold ${
                                    subscribed
                                        ? 'bg-gray-200 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                                        : 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                } hover:opacity-90  active:bg-youtube active:transition duration-500`}
                            >
                                {subscribed ? 'Subscribed' : 'Subscribe'}
                            </button>
                            <div className='flex absolute right-0 h-9'>
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
                        <p className='text-xl font-extrabold font-roboto tracking-tight my-5'>
                            {`${
                                videoInfo &&
                                parseInt(
                                    videoInfo.statistics.commentCount
                                ).toLocaleString()
                            } Comments`}
                        </p>
                        <CommentSection videoId={videoId} />
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
