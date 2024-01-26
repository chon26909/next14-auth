import { auth } from '@/auth';
import { signOut } from '@/auth';

import React from 'react';

const SettingPage = async () => {
    const session = await auth();

    return (
        <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <form
                action={async () => {
                    'use server';
                    await signOut();
                }}
            >
                <button type='submit'>SignOut</button>
            </form>
        </div>
    );
};

export default SettingPage;
