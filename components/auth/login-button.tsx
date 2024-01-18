'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
    children: React.ReactNode;
    mode?: 'modal' | 'redirect';
    asChild?: boolean;
};

const LoginButton = ({ children, mode = 'redirect', asChild }: Props) => {
    const router = useRouter();

    const onClick = () => {
        router.push('/auth/login');
    };

    if (mode === 'modal') {
        return <div>TODO: implement modal</div>;
    }

    return (
        <div>
            <span onClick={onClick} className='cursor-pointer'>
                {children}
            </span>
        </div>
    );
};

export default LoginButton;
