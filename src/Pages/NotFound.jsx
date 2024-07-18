import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='w-full h-full bg-zinc-50 dark:bg-zinc-950 pt-3 pb-3 z-50'>
            <Link to='/' className='flex items-center static'>
                <img
                    className='size-7 relative top-0.5'
                    alt='YouTube'
                    src='https://developers.google.com/static/site-assets/logo-youtube.svg'
                />
                <h1 className='ml-0.5 font-logo font-medium tracking-tight text-xl'>
                    YouTube
                </h1>
            </Link>
            <section className='h-full flex flex-col justify-center items-center'>
                <div className='font-roboto text-left tracking-tight'>
                    <h1 className='font-extrabold text-5xl leading-loose'>
                        Oops!
                    </h1>
                    <p className='font-semibold text-2xl leading-6 opacity-50'>
                        The page you are looking for
                    </p>
                    <p className='font-semibold text-2xl opacity-50'>
                        cannot be found.
                    </p>
                </div>
            </section>
        </div>
    );
}
