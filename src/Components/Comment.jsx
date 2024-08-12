import React, { useState } from 'react';
import { format } from 'timeago.js';
import { useDarkMode } from '../Context/DarkModeContext';
import LikeButton from './LikeButton';
import { RxDotsVertical } from 'react-icons/rx';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import CommentDropdown from './CommentDropdown';
import useOutsideClick from '../Hooks/useOutsideClick';

export default function Comment({ comment, totalComments, setTotalComments }) {
    const {
        authorProfileImageUrl,
        authorDisplayName,
        publishedAt,
        textOriginal,
        likeCount,
        totalReplyCount,
    } = comment;
    const [replies, setReplies] = useState(false);
    const { darkMode } = useDarkMode();
    const [showDropdown, setShowDropdown] = useState(false);
    const handleOutsideClick = () => {
        setShowDropdown(false);
    };
    const ref = useOutsideClick(handleOutsideClick);
    const handleClick = (e) => {
        setShowDropdown(true);
    };
    return (
        <li className='flex mb-6 relative'>
            {authorProfileImageUrl ? (
                <img
                    className='rounded-full size-10'
                    alt='comment'
                    src={authorProfileImageUrl}
                />
            ) : (
                <div className='flex justify-center items-center text-2xl font-semibold rounded-full min-w-10 h-10 bg-gray-300 dark:bg-zinc-800'>
                    {authorDisplayName.substring(1, 2).toUpperCase()}
                </div>
            )}
            <div className='ml-4'>
                <div className='flex items-baseline '>
                    <p className='font-semibold text-sm mr-1'>
                        {authorDisplayName}
                    </p>
                    <p className='text-xs opacity-70'>{format(publishedAt)}</p>
                </div>
                <pre className='font-roboto text-sm mb-1 whitespace-pre-wrap pr-10'>
                    {textOriginal}
                </pre>
                <div className='flex items-center'>
                    <LikeButton forComment={true} likeCount={likeCount} />
                    <button className='ml-2 rounded-full w-14 h-9 text-xs font-medium hover:bg-gray-200 dark:hover:bg-zinc-800 active:brightness-90 dark:active:brightness-125'>
                        Reply
                    </button>
                </div>
                {totalReplyCount > 0 && (
                    <div
                        onClick={() => setReplies(!replies)}
                        className='text-sky-600 dark:text-sky-500 flex items-center rounded-full w-fit h-9 bg-sky-500 bg-opacity-0 hover:bg-opacity-20 active:brightness-125 cursor-pointer'
                    >
                        {'\xa0\xa0\xa0'}

                        {replies ? (
                            <GoChevronDown className='size-5 mr-2' />
                        ) : (
                            <GoChevronUp className='size-5 mr-2' />
                        )}
                        <p className='text-sm font-bold pr-2'>
                            {totalReplyCount > 1000000
                                ? `${
                                      Math.floor(totalReplyCount / 100000) / 10
                                  }M`
                                : totalReplyCount > 1000
                                ? `${Math.floor(totalReplyCount / 1000)}K`
                                : totalReplyCount}{' '}
                            replies{'\xa0\xa0\xa0'}
                        </p>
                    </div>
                )}
            </div>
            <button
                onClick={handleClick}
                className={`absolute right-0 -mt-2 flex justify-center items-center size-10 rounded-full active:transition ${
                    darkMode
                        ? 'active:bg-zinc-800 duration-700'
                        : 'active:bg-zinc-300 active:border-2 active:border-zinc-300  duration-500'
                }`}
            >
                <RxDotsVertical className='size-5' />
            </button>
            {showDropdown && (
                <div ref={ref}>
                    <CommentDropdown
                        commentInfo={comment}
                        setTotalComments={setTotalComments}
                        totalComments={totalComments}
                    />
                </div>
            )}
        </li>
    );
}
