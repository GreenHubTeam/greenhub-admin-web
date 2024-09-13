import { LogoComponent } from "@/components/ui/LogoComponent";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import NotFoundLogo from '../../public/notfound.png'
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <Image
                    src={NotFoundLogo}
                    alt="Logo da greenHub"
                    width={300}
                    height={300}
                />
                <Typography variant="h2" sx={{ fontWeight: 600 }}>
                    Error - 404
                </Typography>
                <Typography variant="h5">
                    Pagina não encontrada
                </Typography>

                <Button
                    LinkComponent={Link}
                    href="/hub/dashboard"
                    variant="contained"
                    sx={{ backgroundColor: 'green', boxShadow: 'none', height: '3.5rem', borderRadius: '.7rem' }}
                >
                    Ir para o hub
                </Button>
            </Box>

            <Box>
                <LogoComponent />
            </Box>

        </Box>
    )
}