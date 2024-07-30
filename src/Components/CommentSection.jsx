import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import Comment from './Comment';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import { useUserContext } from '../Context/UserContext';
import InputComment from './InputComment';
import useComment from '../Hooks/useComment';

export default function CommentSection({ videoInfo, videoId }) {
    const { youtube } = useYoutubeApi();
    const { user } = useUserContext();
    const {
        isLoading,
        error,
        data: comments,
    } = useQuery({
        queryKey: ['comment', videoId],
        queryFn: () => youtube.comment(videoId),
        refetchOnWindowFocus: false,
    });
    const {
        commentQuery: { data: commentByUser },
    } = useComment();
    const [totalComments, setTotalComments] = useState(
        videoInfo && videoInfo.statistics.commentCount
    );
    return (
        <>
            <p className='text-xl font-extrabold font-roboto tracking-tight my-5'>
                {`${
                    videoInfo && parseInt(totalComments).toLocaleString()
                } Comments`}
            </p>
            {user && (
                <InputComment
                    setTotalComments={setTotalComments}
                    totalComments={totalComments}
                />
            )}

            <ul>
                {isLoading && <LoadingSpinner />}
                {error && <Error />}
                {commentByUser &&
                    commentByUser.map((comment) => (
                        <Comment
                            totalComments={totalComments}
                            setTotalComments={setTotalComments}
                            key={comment.commentId}
                            comment={comment}
                        />
                    ))}
                {comments &&
                    comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
            </ul>
        </>
    );
}
