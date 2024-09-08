'use client'

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function HubPage() {
    return (
        <>
            <Button onClick={() => signOut()}>
                Deslogar
            </Button>
        </>
    )
}