import React from 'react';
import useComment from '../Hooks/useComment';
import { ReactComponent as DeleteIcon } from './icons/DeleteIcon.svg';
import { ReactComponent as ReportIcon } from './icons/ReportIcon.svg';
import { useUserContext } from '../Context/UserContext';

export default function CommentDropdown({ commentInfo }) {
    const { user } = useUserContext();
    const isMyComment = user && commentInfo.userId === user.uid;
    const { removeComment } = useComment();
    const handleDelete = () => {
        if (isMyComment) {
            removeComment.mutate(commentInfo);
        } else {
            return;
        }
    };
    return (
        <div className='cursor-default absolute top-10 right-0 w-32 dark:bg-zinc-800 bg-gray-50 rounded-xl shadow-account dark:shadow-none'>
            <button
                onClick={handleDelete}
                className={`w-full px-4 py-2 my-2 flex items-center hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-zinc-600 dark:active:bg-zinc-600 ${
                    !isMyComment &&
                    'active:brightness-95 dark:active:brightness-125'
                }`}
            >
                <div className='size-6 mr-4 fill-zinc-900 dark:fill-gray-50'>
                    {isMyComment ? <DeleteIcon /> : <ReportIcon />}
                </div>
                <p className='text-sm'>{isMyComment ? 'Delete' : 'Report'}</p>
            </button>
        </div>
    );
}
