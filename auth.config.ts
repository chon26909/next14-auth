// import Github from 'next-auth/providers/github';
import bcrypt from 'bcrypt';
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './schemas';
import { getUserByEmail } from './database/user';

export default {
    providers: [
        credentials({
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
        })
    ]
} satisfies NextAuthConfig;
