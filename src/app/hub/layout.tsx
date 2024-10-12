'use client'

import Link from "next/link";
import { env } from "@/env/env";
import { useEffect } from "react";
import { deleteCookie } from 'cookies-next';
import { usePathname, useRouter } from "next/navigation";
import LogoutIcon from '@mui/icons-material/Logout';
import { setupAxiosInterceptors } from "@/libs/axios";
import { signOut, useSession } from "next-auth/react";
import { LogoComponent } from "@/components/ui/LogoComponent";
import { Dashboard, CorporateFare, AccountBox, Assessment } from "@mui/icons-material";
import { Avatar, Box, Grid2, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
interface LayoutHubProps {
    children: React.ReactNode;
}

const linksNavs = [
    {
        name: 'Dashboard',
        path: '/hub/dashboard',
        icon: <Dashboard />
    },
    {
        name: 'ONGs',
        path: '/hub/ongs',
        icon: <CorporateFare />
    },
    {
        name: 'Usuarios',
        path: '/hub/users',
        icon: <AccountBox />
    },
    {
        name: 'Projetos',
        path: '/hub/projects',
        icon: <Assessment />
    },
]

export default function LayoutHub({ children }: LayoutHubProps) {
    const { data } = useSession();
    const router = useRouter();

    const pathName = usePathname();

    useEffect(() => {
        setupAxiosInterceptors(signOut)
    }, [])

    return (
        <>
            <Grid2 container>
                <Grid2 size={2.5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderRight: 1,
                            borderColor: '#F0F0F0',
                            padding: '1rem',
                            height: '100vh',
                            overflowY: 'auto',
                        }}>

                        <LogoComponent />

                        <List sx={{ marginTop: '1rem' }}>
                            {
                                linksNavs.map((link, index) => (
                                    <Box key={index} component={Link} href={link.path} passHref sx={{
                                        textDecoration: 'none',
                                        color: "#6D6D6D",
                                        fontSize: '.9rem',
                                    }}>
                                        <ListItemButton
                                            sx={{
                                                borderRadius: '8px',
                                                marginBottom: '.2rem',
                                                '&:hover': {
                                                    backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '#F1F1F1', // Fundo verde transparente
                                                },
                                                backgroundColor: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.1)' : '',
                                                color: pathName.includes(link.path) ? 'green' : '',
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: pathName.includes(link.path) ? 'rgba(0, 128, 0, 0.5)' : '' }}>
                                                {link.icon}
                                            </ListItemIcon>
                                            <ListItemText primary={link.name} />
                                        </ListItemButton>
                                    </Box>
                                ))
                            }

                        </List>
                    </Box >
                </Grid2>
                <Grid2 size={9.5}>
                    <Box
                        sx={{
                            display: 'flex',
                            height: '100vh',
                            flexDirection: 'column',
                            paddingX: '2rem'
                        }}
                    >
                        <Box
                            sx={{
                                paddingY: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'end',
                                marginBottom: '1rem',
                                gap: '.5rem'
                            }}
                        >
                            <Tooltip title="Sair">
                                <IconButton onClick={() => {
                                    deleteCookie('jwt');
                                    signOut();
                                }}>
                                    <LogoutIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Ver perfil">
                                <IconButton onClick={() => router.push('/hub/profile')}>
                                    <Avatar
                                        src={data?.user?.image ? `${env.base_url_api}/${data.user.image}` : ""}
                                        alt={data?.user?.name || ""}
                                    />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box sx={{ flexGrow: 1, py: '1rem', overflowY: 'auto' }}>
                            {children}
                        </Box>
                    </Box>
                </Grid2>
            </Grid2 >
        </>
    )
}