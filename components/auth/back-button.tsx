'use client';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

interface BackButtonProps {
    href: string;
    label: string;
}

const BackButton = (props: BackButtonProps) => {
    return (
        <Button variant='link' className='font-normal w-full' size='sm' asChild>
            <Link href={props.href}>{props.label}</Link>
        </Button>
    );
};

export default BackButton;
