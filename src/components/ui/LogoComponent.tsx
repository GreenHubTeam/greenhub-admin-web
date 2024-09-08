import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";

export function LogoComponent() {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
            }}
        >
            <Image
                src='/logo.png'
                alt="Logo da greenHub"
                width={70}
                height={70}
            />

            <Divider orientation="vertical" flexItem variant="middle" />

            <Typography variant="subtitle1" sx={{ color: 'green', fontWeight: 700, fontSize: '1.5rem' }}>
                GreenHub
            </Typography>
        </Box>
    )
}