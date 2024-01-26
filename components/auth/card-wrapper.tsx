import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React, { ReactNode } from 'react';
import Header from './header';
import Social from './social';
import BackButton from './back-button';

interface CardWrapperProps {
    children: ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

const CardWrapper = (props: CardWrapperProps) => {
    const { children, headerLabel, backButtonLabel, backButtonHref, showSocial } = props;

    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};

export default CardWrapper;
