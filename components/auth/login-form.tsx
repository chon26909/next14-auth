'use client';
import React, { useState, useTransition } from 'react';
import CardWrapper from './card-wrapper';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { login } from '@/actions/login';

const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: 'chon@gmail.com',
            password: '1234'
        }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setSuccess('');
        setError('');

        startTransition(async () => {
            try {
                const res = await login(values);
                setSuccess(res.success);
                setError(res.error);
            } catch (error) {}
        });
    };

    return (
        <CardWrapper
            headerLabel='Welcome back'
            backButtonLabel={`Dont't have an account?`}
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder=''
                                            type='email'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder=''
                                            type='password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {success && <FormSuccess message={success} />}
                        {error && <FormError message={error} />}
                        <Button type='submit' className='w-full' disabled={isPending}>
                            Login
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default LoginForm;
