'use client'

import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { formatCPF } from "@/utils/formatCPF";
import { AssignmentInd, Email } from "@mui/icons-material";
import bannerProfile from '../../../../public/bannerProfile.jpg';
import { Avatar, Box, Card, CardContent, Chip, Grid2, Typography } from "@mui/material";

export default function ProfileComponent() {
    const { userData: user, profileImage } = useAuth();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                }}
            >
                <Box
                    component={Image}
                    alt="teste"
                    src={bannerProfile}
                    fill
                    priority
                    sx={{ objectFit: 'cover', borderRadius: '2rem' }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '-3.5rem',
                    paddingLeft: '3rem',
                    zIndex: 1,
                }}
            >
                <Avatar
                    src={profileImage}
                    alt="Foto de perfil"
                    sx={{ height: '100px', width: '100px' }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.4rem',
                        alignItems: 'start'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ color: 'white', fontWeight: '700' }}
                    >
                        {user?.name}
                    </Typography>

                    <Chip label="administrador" color="primary" />
                </Box>
            </Box>

            <Grid2>
                <Grid2 mt={2} size={4}>
                    <Card
                        variant="outlined"
                    >
                        <CardContent>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontSize: '1.5rem',
                                    fontWeight: 700
                                }}
                            >
                                Sobre
                            </Typography>

                            <Typography
                                display='flex'
                                alignItems='center'
                                gap={1}
                                fontSize='1.1rem'
                            >
                                <AssignmentInd />
                                {formatCPF(user?.document || "")}
                            </Typography>

                            <Typography
                                display='flex'
                                alignItems='center'
                                gap={1}
                                fontSize='1.1rem'
                            >
                                <Email />
                                {user?.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    )
}