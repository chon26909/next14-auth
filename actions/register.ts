'use server';
import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/database/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    console.log('values', values);

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: 'Invalid fields!' };
    }

    const { email, password, name } = validatedFields.data;

    // bcrypt generate salt
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'Email already exists!' };
    }

    await db.user.create({
        data: {
            email: email,
            hash: hashedPassword,
            salt: salt,
            name: name
        }
    });

    return { success: 'Email sent!' };
};
