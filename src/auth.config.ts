import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcryptjs  from 'bcryptjs';

import { User } from '@prisma/client';



export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
    },

    callbacks: {
        jwt({token, user}) {
            if(user){
                token.data = user;
            }

            return token;
        },
        session( {session, token, user } ){
            console.log({session, token});
            session.user = token.data as any;
            return session;
        }
    },


    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (!parsedCredentials.success) throw new Error('Invalid data entered');

                const { email, password } = parsedCredentials.data;

                //buscar el correo 
                const user = await prisma.user.findUnique({
                    where: { email: email.toLowerCase() }
                });

                console.log({user})
                // si no hay user return null
                if (!user) throw new Error('User not found');

                // comprara la contraseña con la de la DB
                if (!bcryptjs.compareSync(password, user.password)) throw new Error('Invalid password')

                // regresa el usuario sin el password
                const { password: _ , ...rest } = user;

                // console.log( { rest } );
                return rest;
            },
        }),
    ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);