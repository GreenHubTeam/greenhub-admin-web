'use client'

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IProject } from "@/types/projectTypes";
import relativeTime from 'dayjs/plugin/relativeTime';
import { getStatusChip } from "@/utils/getStatusChip";
import { ArrowBack, Favorite, VolunteerActivism } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Grid2, Skeleton, Typography } from "@mui/material";
import { DescDetail } from "@/components/ui/DescDetail";

interface IProjectDetailPage {
    params: {
        id: string;
    }
};

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export default function ProjectDetailPage({ params: { id } }: IProjectDetailPage) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [projectData, setProjectData] = useState<IProject | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            setLoading(true);
            try {
                const projectDetail = await api.get(`/project/one/${id}`);

                setProjectData(projectDetail.data);
            } catch (error) {
                toast.error("Error ao carregar os dados do projeto");
            } finally {
                setLoading(false)
            }
        };

        fetchProjectData();
    }, [id]);

    return (
        <Box>
            {
                isLoading ? (
                    <Grid2 container spacing={4}>
                        <Grid2 size={8}>
                            <Skeleton
                                animation='wave'
                                height={350}
                            />
                        </Grid2>
                        <Grid2 size={4}>
                            <Skeleton
                                animation='wave'
                                height={350}
                            />
                        </Grid2>
                    </Grid2>
                ) : projectData ? (
                    <Grid2 container spacing={4}>
                        <Grid2 size={12}>
                            <Button
                                variant="outlined"
                                sx={{
                                    border: '1px solid gray',
                                    color: 'black',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                                onClick={() => router.push('/hub/projects')}
                            >
                                <ArrowBack /> Voltar
                            </Button>
                        </Grid2>

                        <Grid2 size={8}>
                            <Card variant="outlined">
                                <CardMedia
                                    sx={{ height: 200 }}
                                    image={projectData?.imagePath ? `${env.base_url_api}/${projectData?.imagePath}` : "/banner.jpg"}
                                    title='Project Image'
                                />
                                <CardContent>
                                    <Box>
                                        {getStatusChip(projectData.status)}
                                    </Box>
                                    <Typography
                                        sx={{
                                            mt: '.4rem',
                                            mb: '.6rem',
                                            fontWeight: 700,
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {projectData.name}
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: '#a5a5a5',
                                            fontWeight: 500,
                                            mb: '.5rem'
                                        }}
                                    >
                                        Publicado {dayjs(projectData.createdAt).fromNow()}
                                    </Typography>


                                    <Divider />

                                    <Typography
                                        sx={{
                                            my: '1rem'
                                        }}
                                    >
                                        {projectData.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>

                        <Grid2 size={4}>
                            <Card
                                variant="outlined"
                            >
                                <CardContent>
                                    <DescDetail
                                        label="Publicado Por"
                                        data={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    height: '100%',
                                                    gap: '1rem'
                                                }}
                                            >
                                                <Avatar
                                                    src={`${env.base_url_api}/${projectData.Ong.imagePath}`}
                                                    alt={projectData.name}
                                                />

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        flex: 1,
                                                        overflow: 'hidden'
                                                    }}
                                                >
                                                    <Typography>
                                                        {projectData.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                    />

                                    <Box
                                        mb={2}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#a5a5a5',
                                                fontWeight: 500,
                                                mb: '.5rem'
                                            }}
                                        >
                                            N° de curtidas
                                        </Typography>

                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }}
                                        >
                                            <Favorite
                                                color="error"
                                            />
                                            {projectData._count?.like}
                                        </Typography>
                                    </Box>

                                    <Box
                                        mb={2}
                                    >
                                        <Typography
                                            sx={{
                                                color: '#a5a5a5',
                                                fontWeight: 500,
                                                mb: '.5rem'
                                            }}
                                        >
                                            N° de doações
                                        </Typography>

                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem'
                                            }}
                                        >
                                            <VolunteerActivism
                                                color="success"
                                            />
                                            {projectData._count?.Donate}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
                ) : (
                    <Typography>
                        Nenhum conteudo encontrado
                    </Typography>
                )
            }
        </Box>
    )
}