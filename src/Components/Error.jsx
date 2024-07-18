import React from 'react';

export default function Error() {
    return (
        <section className='h-full flex flex-col justify-center items-center my-10'>
            <div className='font-roboto text-left tracking-tight'>
                <h1 className='font-extrabold text-5xl leading-loose'>Oops!</h1>
                <p className='font-semibold text-2xl leading-6 opacity-70'>
                    Something's gone wrong.
                </p>
            </div>
        </section>
    );
}
