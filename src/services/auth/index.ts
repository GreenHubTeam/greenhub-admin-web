import NextAuth from "next-auth";
import { api } from "@/libs/axios";
import { cookies } from "next/headers";
import Credentials from "next-auth/providers/credentials";

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
                    }

                    if (data.user.type !== "ADMIN") {
                        return null
                    }

                    cookies().set('jwt', data.token)

                    return {
                        id: data.user.id,
                        image: data.user.imagePath,
                        email: data.user.email,
                        name: data.user.name
                    }
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