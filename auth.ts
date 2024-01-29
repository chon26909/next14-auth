import NextAuth from 'next-auth';

import authConfig from '@/auth.config';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './database/user';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async session({ token, session }) {
            console.log('session', session);

            console.log('token', token);

            // if (session.user) {
            //     session.user.email = '';
            //

            if (session.user) {
                session.user.id = token.sub;
            }

            if (session.user && token.user) {
                session.user.role = token.role;
            }

            return Promise.resolve(session);
        },
        async jwt({ token }) {
            console.log(token);

            if (!token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            }

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    ...authConfig

    // providers: [
    //     github({
    //         clientId: process.env.GITHUB_CLIENT_ID,
    //         clientSecret: process.env.GITHUB_CLIENT_SECRET
    //     })
    // ]
    // callbacks: {
    //     async session(session, token) {
    //         session.accessToken = token.accessToken;
    //         return Promise.resolve(session);
    //     },
    //     async jwt(token, user, account, profile, isNewUser) {
    //         return Promise.resolve(token);
    //     }
    // }
});
