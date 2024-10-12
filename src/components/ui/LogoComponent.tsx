import Image from "next/image";
import Logo from '../../../public/logo.png'
import { Box, Divider, Typography } from "@mui/material";

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
                src={Logo}
                alt="Logo da greenHub"
                width={70}
                height={70}
                priority
            />

            <Divider orientation="vertical" flexItem variant="middle" />

            <Typography variant="subtitle1" sx={{ color: 'green', fontWeight: 700, fontSize: '1.5rem' }}>
                GreenHub
            </Typography>
        </Box>
    )
}