import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './database/user';
import Google from 'next-auth/providers/google';

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = LoginSchema.safeParse(credentials);
                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email);
                    if (!user || !user.hash) return null;
                    // const hashPassword = await bcrypt.hash(password, user.salt);
                    // const passwordMatch = await bcrypt.compare(hashPassword, user.hash);
                    // if (passwordMatch) return user;

                    return user;
                }
                return null;
            }
        }),
        Github({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
} satisfies NextAuthConfig;
