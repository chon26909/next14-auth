import { UserRole } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
    role: UserRole;
};

declare module 'next-auth' {
    interface Session {
        user: ExtendedUser;
    }
}

// import { JWT } from 'next-auth/jwt';

// declare module 'next-auth/jwt' {
//     interface JWT {
//         role?: 'ADMIN' | 'USER';
//     }
// }
