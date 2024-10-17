'use client'

import Image from "next/image";
import { api } from "@/libs/axios";
import CountUp from 'react-countup';
import { toast } from "react-toastify";
import { PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";
import GroupIcon from '@mui/icons-material/Group';
import bannerImage from '../../../../public/banner.jpg';
import { IDashboardType } from "@/types/dashboardTypes";
import BusinessIcon from '@mui/icons-material/Business';
import { Newspaper, PersonPin } from "@mui/icons-material";
import { Badge, Box, Grid2, Paper, Skeleton, Typography } from "@mui/material";

export default function DashboardComponent() {
    const [dashboardData, setDashboardData] = useState<IDashboardType | null>(null);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/dashboard/admin');

            setDashboardData(response.data);
        } catch (error) {
            toast.error("Error ao buscar dados do dashboard")
        }
    };

    useEffect(() => {
        fetchDashboardData();

        return () => new AbortController().abort();
    }, [])

    return (
        <Box paddingBottom={2}>
            {!dashboardData ? (
                <Grid2 container sx={{ marginBottom: '2rem' }}>
                    <Grid2 size={12}>
                        <Skeleton variant="rounded" animation={'wave'} height={300} />
                    </Grid2>
                </Grid2>
            ) : (
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
                        priority
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
            )}


            {!dashboardData ? (
                <Grid2 container spacing={2}>
                    {Array.from([1, 2, 3, 4, 5, 6]).map((_, index) => (
                        <Grid2 size={4} key={index}>
                            <Skeleton variant="rounded" animation={"wave"} height={150} />
                        </Grid2>
                    ))}
                </Grid2>
            ) : (
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
                                    <CountUp end={dashboardData?.totalUsers} duration={2} />
                                </Typography>

                                <GroupIcon
                                    sx={{
                                        color: 'green',
                                        fontSize: '2.5rem'
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Grid2 >
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
                                    <CountUp end={dashboardData?.totalOngs} duration={2} />
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
                                    <CountUp end={dashboardData?.totalDonors} duration={2} />
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
                    <Grid2 size={6}>
                        <Paper
                            variant='outlined'
                            sx={{
                                minHeight: '150px',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Relação de Tipos de Usuarios
                            </Typography>
                            <PieChart
                                series={[{
                                    data: dashboardData?.dataChartUsers?.map((data, index) => {
                                        const totalValue = dashboardData.dataChartUsers.reduce((acc, curr) => acc + curr.value, 0); // Soma dos valores
                                        const percentage = (data.value / totalValue) * 100; // Calcula a porcentagem

                                        return {
                                            id: index,
                                            value: data.value,
                                            label: `${data.label} (${percentage.toFixed(1)}%)`,
                                        };
                                    }),
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                    cx: 150,
                                    cy: 150
                                }]}
                                height={300}
                            />
                        </Paper>

                    </Grid2>
                    <Grid2 size={6}>
                        <Paper
                            variant='outlined'
                            sx={{
                                minHeight: '150px',
                                padding: '1rem 2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 2
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Relação de Projetos
                            </Typography>
                            <PieChart
                                series={[{
                                    data: dashboardData?.dataChartProject?.map((data, index) => {
                                        const totalValue = dashboardData.dataChartProject.reduce((acc, curr) => acc + curr.value, 0); // Soma dos valores
                                        const percentage = (data.value / totalValue) * 100; // Calcula a porcentagem

                                        return {
                                            id: index,
                                            value: data.value,
                                            label: `${data.label} (${percentage.toFixed(1)}%)`,
                                        };
                                    }),
                                    innerRadius: 30,
                                    outerRadius: 100,
                                    paddingAngle: 5,
                                    cornerRadius: 5,
                                    cx: 150,
                                    cy: 150,
                                }]}
                                colors={['green', 'red', 'orange']}
                                height={300}
                            />
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
                                    <CountUp duration={2} end={dashboardData?.totalProjects} />
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
                                    <CountUp duration={2} end={dashboardData?.totalProjectsApproved} />
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
                                    <CountUp duration={2} end={dashboardData?.totalProjectsReproved} />
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
                </Grid2 >
            )
            }
        </Box >
    )
}