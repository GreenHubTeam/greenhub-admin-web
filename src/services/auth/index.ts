import NextAuth from "next-auth";
import { api } from "@/libs/axios";
import { cookies } from "next/headers";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { IUser } from "@/types/userTypes";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                try {
                    const { data, status } = await api.post('/login', {
                        email: credentials.email,
                        password: credentials.password
                    });

                    if (status === 400) {
                        return null
                    };

                    if (data.type !== "ADMIN") {
                        return null
                    };

                    const user = jwtDecode(data.token) as JwtPayload & IUser

                    cookies().set('jwt', data.token)

                    return {
                        id: user.id,
                        image: user.imagePath,
                        email: user.email,
                        name: user.name,
                        token: data.token
                    };
                } catch (error) {
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    }
})