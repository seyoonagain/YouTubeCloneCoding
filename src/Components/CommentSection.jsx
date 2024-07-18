import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../Context/YoutubeApiContext';
import Comment from './Comment';
import LoadingSpinner from './LoadingSpinner';
import Error from './Error';

export default function CommentSection({ videoId }) {
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data: comments,
    } = useQuery({
        queryKey: ['comment', videoId],
        queryFn: () => youtube.comment(videoId),
        refetchOnWindowFocus: false,
    });
    return (
        <ul>
            {isLoading && <LoadingSpinner />}
            {error && <Error />}
            {comments &&
                comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
        </ul>
    );
}
