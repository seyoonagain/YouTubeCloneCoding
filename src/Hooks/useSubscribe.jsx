import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useUserContext } from '../Context/UserContext';
import {
    addToSubscription,
    getSubscription,
    unsubscribe,
} from '../API/firebase';

export default function useSubscribe() {
    const queryClient = useQueryClient();
    const { user } = useUserContext();
    const uid = user && user.uid;

    const subscriptionQuery = useQuery({
        queryKey: ['subscription', uid],
        queryFn: () => getSubscription(uid),
    });

    const addChannel = useMutation({
        mutationFn: (channel) => {
            addToSubscription(channel, uid);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['subscription'],
                refetchType: 'all',
            });
        },
    });

    const removeChannel = useMutation({
        mutationFn: (channel) => {
            unsubscribe(channel, uid);
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['subscription'],
                refetchType: 'all',
            });
        },
    });

    return { subscriptionQuery, addChannel, removeChannel };
}
