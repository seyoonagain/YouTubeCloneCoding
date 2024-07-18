import { createContext, useContext } from 'react';
import Youtube from '../API/youtube';
import FakeYoutubeClient from '../API/fakeYoutubeClient';
import YoutubeClient from '../API/youtubeClient';

export const YoutubeApiContext = createContext();

export default function YoutubeApiProvider({ children }) {
    // const client = new FakeYoutubeClient();
    const client = new YoutubeClient();
    const youtube = new Youtube(client);
    return (
        <YoutubeApiContext.Provider value={{ youtube }}>
            {children}
        </YoutubeApiContext.Provider>
    );
}

export function useYoutubeApi() {
    return useContext(YoutubeApiContext);
}