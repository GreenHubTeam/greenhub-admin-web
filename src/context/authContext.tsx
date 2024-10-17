'use client'

import { env } from "@/env/env";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "cookies-next";
import { IUser } from "@/types/userTypes";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

interface AuthContextProps {
    userData: IUser | null
    setUserData: Dispatch<SetStateAction<IUser | null>>
    decodedToken: (token: string) => void;
    profileImage: string;
    setProfileImage: Dispatch<SetStateAction<string>>
};

interface AuthProviderProps {
    children: ReactNode
};

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
    const { status } = useSession();
    const [userData, setUserData] = useState<IUser | null>(null);
    const [profileImage, setProfileImage] = useState("/fotop1.webp");

    const decodedToken = (token: string) => {
        const userData = jwtDecode<IUser>(token);
        setProfileImage(`${env.base_url_api}/${userData.imagePath}`)
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
                profileImage,
                setProfileImage
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};