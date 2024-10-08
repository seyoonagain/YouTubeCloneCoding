import React, { useState } from 'react';
import {
    PiThumbsUpLight,
    PiThumbsUpFill,
    PiThumbsDownLight,
    PiThumbsDownFill,
} from 'react-icons/pi';
import { useUserContext } from '../Context/UserContext';

export default function LikeButton({ forComment, likeCount }) {
    const { user } = useUserContext();
    let [thumbsUp, setThumbsUp] = useState(likeCount);
    const [liked, setLiked] = useState(false);
    const [disLiked, setDisLiked] = useState(false);
    const handleLikeButton = () => {
        if (!user) {
            return alert('Sign in to make your opinion count.');
        }
        if (!liked) {
            setDisLiked(false);
            thumbsUp++;
        } else {
            thumbsUp--;
        }
        setLiked(!liked);
        setThumbsUp(thumbsUp);
    };
    const handleDisLikeButton = () => {
        if (!user) {
            return alert('Sign in to make your opinion count.');
        }
        if (liked && !disLiked) {
            setLiked(false);
            thumbsUp--;
        }
        setDisLiked(!disLiked);
        setThumbsUp(thumbsUp);
    };
    return (
        <div className='flex items-center'>
            <div
                onClick={() => handleLikeButton()}
                className={`flex items-center ${
                    forComment
                        ? 'h-9 mr-2'
                        : 'justify-center min-w-20 h-9 rounded-l-full bg-gray-200 dark:bg-zinc-800 border-r border-r-zinc-300 dark:border-r-zinc-700 hover:brightness-95 dark:hover:brightness-125 active:brightness-90 dark:active:brightness-150'
                }`}
            >
                <button
                    className={`${
                        forComment
                            ? 'flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800'
                            : ''
                    }`}
                >
                    {liked ? (
                        <PiThumbsUpFill className='size-5' />
                    ) : (
                        <PiThumbsUpLight className='size-5' />
                    )}
                </button>
                <p
                    className={`cursor-default min-w-2 ${
                        forComment
                            ? 'text-xs opacity-70'
                            : 'text-sm font-semibold ml-2'
                    }`}
                >
                    {thumbsUp === 0
                        ? ''
                        : thumbsUp > 1000000
                        ? `${Math.floor(thumbsUp / 100000) / 10}M`
                        : thumbsUp > 1000
                        ? `${Math.floor(thumbsUp / 1000)}K`
                        : thumbsUp}
                </p>
            </div>
            <button
                onClick={() => handleDisLikeButton()}
                className={`${
                    forComment
                        ? 'flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800'
                        : 'flex items-center justify-center min-w-12 h-9 rounded-r-full bg-gray-200 dark:bg-zinc-800 dark:border-r-zinc-700 hover:brightness-95 dark:hover:brightness-125 active:brightness-90 dark:active:brightness-150'
                }`}
            >
                {disLiked ? (
                    <PiThumbsDownFill className='size-5' />
                ) : (
                    <PiThumbsDownLight className='size-5' />
                )}
            </button>
        </div>
    );
}
