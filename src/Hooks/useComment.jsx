import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteComment, getComment, leaveComment } from '../API/firebase';
import { useParams } from 'react-router-dom';

export default function useComment() {
    const queryClient = useQueryClient();
    const { videoId } = useParams();

    const commentQuery = useQuery({
        queryKey: ['comment'],
        queryFn: () => getComment(videoId),
    });

    const addComment = useMutation({
        mutationFn: (commentInfo) => {
            leaveComment(commentInfo);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['comment'],
                refetchType: 'all',
            });
        },
    });

    const removeComment = useMutation({
        mutationFn: (commentInfo) => {
            deleteComment(commentInfo);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['comment'],
                refetchType: 'all',
            });
        },
    });

    return { commentQuery, addComment, removeComment };
}
