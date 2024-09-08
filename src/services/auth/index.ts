import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                if (credentials.email === "admin@gmail.com" && credentials.password === "admin") {
                    return {
                        id: '1',
                        email: credentials.email,
                        name: 'Admin'
                    }
                }

                return null
            },
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login',
        signOut: '/login'
    }
})