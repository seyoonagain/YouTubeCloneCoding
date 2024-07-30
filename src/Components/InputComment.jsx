import React, { useRef, useState } from 'react';
import { useUserContext } from '../Context/UserContext';
import { v4 as uuid } from 'uuid';
import useComment from '../Hooks/useComment';
import { useParams } from 'react-router-dom';

const BUTTON_STYLE =
    'rounded-full font-medium text-sm tracking-tight py-2 px-4';

export default function InputComment() {
    const { videoId } = useParams();
    const { addComment } = useComment(videoId);
    const {
        user: { photoURL, displayName, uid },
    } = useUserContext();
    const [comment, setComment] = useState('');
    const [inputOpen, setInputOpen] = useState(false);
    const handleChange = (e) => {
        setComment(e.target.value);
    };
    const handleFocus = () => setInputOpen(true);
    const handleCancel = () => {
        setComment('');
        setInputOpen(false);
    };
    const ref = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const publishedAt = new Date(Date.now());
        const commentInfo = {
            authorProfileImageUrl: photoURL,
            authorDisplayName: displayName,
            publishedAt: publishedAt.toString(),
            textOriginal: comment,
            likeCount: 0,
            totalReplyCount: 0,
            videoId,
            commentId: uuid(),
            userId: uid,
        };
        addComment.mutate(commentInfo);
        ref.current.blur();
        setComment('');
        setInputOpen(false);
    };
    return (
        <div className='flex min-w-full mb-7'>
            <div className='flex items-start'>
                <img
                    className='rounded-full size-10 mr-4'
                    alt={displayName}
                    src={photoURL}
                />
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                <input
                    ref={ref}
                    className={`placeholder:text-sm outline-none bg-transparent border-b focus:border-b-2 focus:border-gray-800 dark:focus:border-gray-50 dark:border-zinc-700 transition-all ease-in-out duration-300 ${
                        inputOpen
                            ? 'border-gray-800 dark:border-gray-500'
                            : 'border-gray-300'
                    }`}
                    type='text'
                    placeholder='Add a comment...'
                    value={comment}
                    onClick={handleFocus}
                    onChange={handleChange}
                />
                {inputOpen && (
                    <div className='mt-2 flex justify-end gap-2'>
                        <button
                            type='reset'
                            onClick={handleCancel}
                            className={`${BUTTON_STYLE} hover:bg-gray-300 dark:hover:bg-zinc-700 active:brightness-90 dark:active:brightness-125`}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${BUTTON_STYLE} ${
                                comment
                                    ? 'bg-blue-700 dark:bg-sky-500 text-gray-50 dark:text-zinc-950 hover:brightness-95 dark:hover:brightness-110 active:brightness-110 dark:active:brightness-90'
                                    : 'bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500'
                            }`}
                            type='submit'
                        >
                            Comment
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
