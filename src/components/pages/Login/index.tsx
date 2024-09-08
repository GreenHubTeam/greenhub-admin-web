import Image from 'next/image'
import { FormLoginComponent } from "./Form";
import { ModalLoginComponent } from './Modal';
import { Box, Typography } from "@mui/material";
import { LogoComponent } from '@/components/ui/LogoComponent';

export function LoginComponent() {
    return (
        <Box sx={{ display: "flex", minHeight: '100vh' }}>
            <Box sx={{ position: 'relative', flex: 1 }}>
                <Image
                    src="/login.jpg"
                    fill
                    alt="login"
                    priority
                    style={{ objectFit: 'cover' }}
                />
            </Box>

            <Box sx={{ width: '500px', overflowY: 'auto' }}>
                <Box
                    sx={{
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4rem',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}>

                    <LogoComponent />

                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: 700 }}
                        >
                            Acesse a sua conta
                        </Typography>

                        <Typography
                            sx={{ fontWeight: 500, color: 'gray' }}
                        >
                            Sistema Administrador
                        </Typography>

                        <Box sx={{ marginTop: '2rem' }}>
                            <FormLoginComponent />
                        </Box>
                    </Box>

                    <ModalLoginComponent />
                </Box>
            </Box>
        </Box>
    )
}