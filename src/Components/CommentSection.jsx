import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import Comment from './Comment';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';
import { useUserContext } from '../Context/UserContext';
import InputComment from './InputComment';
import useComment from '../Hooks/useComment';

export default function CommentSection({ videoId }) {
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
    return (
        <>
            {user && <InputComment />}

            <ul>
                {isLoading && <LoadingSpinner />}
                {error && <Error />}
                {commentByUser &&
                    commentByUser.map((comment) => (
                        <Comment key={comment.commentId} comment={comment} />
                    ))}
                {comments &&
                    comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
            </ul>
        </>
    );
}
