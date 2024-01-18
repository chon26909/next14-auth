'use client';
import React from 'react';
import CardWrapper from './card-wrapper';

const LoginForm = () => {
    return (
        <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel={`Dont't have an account?`}
            backButtonHref='/auth/register'
            showSocial
        >
            <div>login form</div>
        </CardWrapper>
    );
};

export default LoginForm;
