import React, { useState } from 'react';

export default function VideoDescription({ video }) {
    const { description, publishedAt } = video.snippet;
    const [showMore, setShowMore] = useState(false);
    const { viewCount } = video.statistics;
    return (
        <div className='font-roboto rounded-xl p-3 bg-gray-200 dark:bg-zinc-800'>
            <p className='text-dsc font-semibold'>
                {`${parseInt(viewCount).toLocaleString()} views`}
                {'\xa0\xa0'}
                {new Date(publishedAt)
                    .toDateString()
                    .substring(4)
                    .replace(/\s(?=\d{4})/gm, ', ')}
            </p>
            <pre className='text-dsc font-roboto font-medium tracking-tight text-wrap'>
                {showMore ? description : `${description.substring(0, 100)}...`}
                <span
                    onClick={() => setShowMore(!showMore)}
                    className={showMore ? 'hidden' : 'cursor-pointer'}
                >
                    {'\xa0\xa0'}
                    ...more
                </span>
                <br />
                <span
                    onClick={() => setShowMore(!showMore)}
                    className={!showMore ? 'hidden' : 'cursor-pointer'}
                >
                    <br />
                    Show less
                </span>
            </pre>
        </div>
    );
}
