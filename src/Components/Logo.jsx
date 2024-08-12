import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link to='/' className='flex items-center static'>
            <img
                className='size-7'
                alt='YouTube'
                src='https://developers.google.com/static/site-assets/logo-youtube.svg'
            />
            <h1 className='relative -top-0.5 ml-0.5 font-logo font-medium tracking-tight text-xl'>
                YouTube
            </h1>
        </Link>
    );
}
