'use client'

import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { IUser } from "@/types/userTypes";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface AuthContextProps {
    userData: IUser | null
    setUserData: Dispatch<SetStateAction<IUser | null>>
    decodedToken: (token: string) => void;
};

interface AuthProviderProps {
    children: ReactNode
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const { status } = useSession();
    const [userData, setUserData] = useState<IUser | null>(null);

    const decodedToken = (token: string) => {
        const userData = jwtDecode<IUser | null>(token);
        setUserData(userData);
    }

    useEffect(() => {
        const token = getCookie('jwt');

        if (token && !userData) decodedToken(token);
    }, [status, userData])

    return (
        <AuthContext.Provider
            value={{
                decodedToken,
                setUserData,
                userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};