import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from './lib/db';
import { getUserById } from './database/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // async signIn({ user }) {
        //     if (user) {
        //         const existingUser = await getUserById(user.id as string);

        //         if (!existingUser || !existingUser.emailVerified) {
        //             return false;
        //         }
        //     }

        //     return true;
        // },
        async session({ token, session }: any) {
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
        async jwt({ token }: any) {
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
