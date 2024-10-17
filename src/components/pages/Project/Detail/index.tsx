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
import { DescDetail } from "@/components/ui/DescDetail";
import { ArrowBack, Chat, Check, Clear, Favorite, Group, VolunteerActivism } from "@mui/icons-material";
import { Avatar, Box, Button, Card, CardContent, CardMedia, Divider, Grid2, Skeleton, Typography } from "@mui/material";

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

export default function ProjectDetailComponent({ id }: { id: string }) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);
    const [refetchData, setRefetchData] = useState(false);
    const [srcImage, setSrcImage] = useState("/banner.jpg");
    const [isLoadingChange, setIsLoadingChange] = useState(false);
    const [projectData, setProjectData] = useState<IProject | null>(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            setLoading(true);
            try {
                const projectDetail = await api.get(`/project/one/${id}`);

                setProjectData(projectDetail.data);
                setSrcImage(`${env.base_url_api}/${projectDetail.data.imagePath}`)
            } catch (error) {
                toast.error("Error ao carregar os dados do projeto");
            } finally {
                setLoading(false)
            }
        };

        fetchProjectData();

        return () => new AbortController().abort();
    }, [id, refetchData]);

    async function changeStatusProject(status: "APPROVED" | "REPROVED" | "WAITING" | "INACTIVE") {
        try {
            setIsLoadingChange(true);
            await api.put(`/project/update/admin/${id}`, {
                status
            });

            toast.success("Mudança de status concluida");
        } catch (error) {
            toast.error("Error ao alterar o status do projeto");
        } finally {
            setIsLoadingChange(false);
            setRefetchData(prev => !prev)
        }
    }

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
                                    component='img'
                                    alt='Project Image'
                                    sx={{ height: 200 }}
                                    image={srcImage}
                                    title='Project Image'
                                    onError={() => {
                                        setSrcImage('/banner.jpg')
                                    }}
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
                                    {projectData.status !== 'REPROVED' && (
                                        <Grid2 mb={2} container spacing={2}>
                                            {projectData.status === 'WAITING' && (
                                                <Grid2 size={6}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        endIcon={<Check />}
                                                        fullWidth
                                                        disabled={isLoading || isLoadingChange}
                                                        onClick={() => changeStatusProject('APPROVED')}
                                                    >
                                                        Aprovar
                                                    </Button>
                                                </Grid2>
                                            )}

                                            {projectData.status === 'INACTIVE' && (
                                                <Grid2 size={6}>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        endIcon={<Check />}
                                                        fullWidth
                                                        disabled={isLoading || isLoadingChange}
                                                        onClick={() => changeStatusProject('APPROVED')}
                                                    >
                                                        Ativar
                                                    </Button>
                                                </Grid2>
                                            )}

                                            {projectData.status !== 'INACTIVE' && (
                                                <Grid2 size={6}>
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        fullWidth
                                                        disabled={isLoading || isLoadingChange}
                                                        endIcon={<Clear />}
                                                        onClick={() => {
                                                            if (projectData.status === 'APPROVED') {
                                                                return changeStatusProject('INACTIVE')
                                                            }

                                                            return changeStatusProject('REPROVED')
                                                        }}
                                                    >
                                                        {projectData.status === 'APPROVED' ? 'INATIVAR' : "Reprovar"}
                                                    </Button>
                                                </Grid2>
                                            )}

                                            <Grid2 size={12}>
                                                <Divider />
                                            </Grid2>
                                        </Grid2>
                                    )}

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

                                                <Typography>
                                                    {projectData.Ong.name}
                                                </Typography>

                                                <Typography>
                                                    {dayjs(projectData.createdAt).format('DD/MM/YYYY')}
                                                </Typography>
                                            </Box>
                                        }
                                    />

                                    <DescDetail
                                        label="N° de curtidas"
                                        icon={<Favorite color="error" />}
                                        data={projectData._count?.like}
                                    />

                                    <DescDetail
                                        label="N° de Doações"
                                        icon={<VolunteerActivism color="success" />}
                                        data={projectData._count?.Donate}
                                    />

                                    <DescDetail
                                        label="N° de feedbacks"
                                        icon={<Chat />}
                                        data={projectData._count?.Feedback}
                                    />

                                    <DescDetail
                                        label="Vizualizaçoes"
                                        icon={<Group />}
                                        data={projectData._count?.View}
                                    />
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