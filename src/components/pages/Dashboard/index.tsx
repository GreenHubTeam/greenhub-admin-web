'use client'

import Image from "next/image";
import GroupIcon from '@mui/icons-material/Group';
import bannerImage from '../../../../public/banner.jpg'
import BusinessIcon from '@mui/icons-material/Business';
import { Newspaper, PersonPin } from "@mui/icons-material";
import { Badge, Box, Grid2, Paper, Typography } from "@mui/material";

export default function DashboardComponent() {
    return (
        <Box paddingBottom={2}>
            <Box
                component="div"
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '300px',
                    display: 'flex',
                    marginBottom: '2rem',
                    alignItems: 'center',
                    color: 'white',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // sobreposição escura
                        zIndex: 1,
                    },
                }}
            >
                <Box
                    component={Image}
                    src={bannerImage}
                    fill
                    alt="Banner"
                    sx={{
                        objectFit: 'cover',
                        zIndex: 0,
                        borderRadius: '1rem'
                    }}
                />

                <Box
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        padding: '0 2rem',
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                        Monitoramento da Plataforma
                    </Typography>
                    <Typography >
                        Acompanhe o desempenho da plataforma em tempo real. Veja o progresso dos projetos, aprovações de ONGs e o total de doações recebidas.
                    </Typography>
                </Box>
            </Box>
            <Grid2 container spacing={4}>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de Usuarios
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                680
                            </Typography>

                            <GroupIcon
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de ONGS
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                30
                            </Typography>

                            <BusinessIcon
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de Contas Doadoras
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                400
                            </Typography>

                            <PersonPin
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de Projetos
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                70
                            </Typography>

                            <Newspaper
                                sx={{
                                    color: 'green',
                                    fontSize: '2.5rem'
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de Projetos Aprovados
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                50
                            </Typography>

                            <Badge badgeContent=" " color="success">
                                <Newspaper
                                    sx={{
                                        color: 'green',
                                        fontSize: '2.5rem'
                                    }}
                                />
                            </Badge>
                        </Box>
                    </Paper>
                </Grid2>
                <Grid2 size={4}>
                    <Paper
                        variant="outlined"
                        sx={{
                            height: '150px',
                            padding: '1rem 2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: 2
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Total de Projetos Reprovados
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}
                        >
                            <Typography variant="h4" fontWeight="700">
                                20
                            </Typography>

                            <Badge badgeContent=" " color="error">
                                <Newspaper
                                    sx={{
                                        color: 'green',
                                        fontSize: '2.5rem'
                                    }}
                                />
                            </Badge>

                        </Box>
                    </Paper>
                </Grid2>
            </Grid2>
        </Box >
    )
}