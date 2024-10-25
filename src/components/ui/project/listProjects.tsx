'use client'

import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { IProject } from "@/types/projectTypes";
import { Replay, Search } from "@mui/icons-material";
import { CardProject } from "@/components/ui/cardProject";
import { Box, Button, Grid2, InputAdornment, MenuItem, Pagination, Skeleton, TextField, Tooltip } from "@mui/material";

const PAGE_SIZE = 6;

export default function ListProject({ ongId }: { ongId: string }) {
    const [projectsData, setProjectsData] = useState<{
        projects: IProject[],
        count: number;
        status: string;
        page: number;
    }>({
        projects: [],
        count: 1,
        status: 'ALL',
        page: 1
    });
    const [isRefetch, setIsRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { searchFilter, setSearchFilter } = useSearch();

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get(`/project/ong/${ongId}`, {
                    params: {
                        page: projectsData.page,
                        status: projectsData.status,
                        search: searchFilter,
                        pageSize: PAGE_SIZE
                    }
                });

                setProjectsData(prev => {
                    return {
                        ...prev,
                        projects: data.projects,
                        count: data.count
                    }
                });
            } catch (error) {
                toast.error("Error ao buscar os projetos");
            } finally {
                setIsLoading(false)
            }
        };

        fetchProjects();

        return () => new AbortController().abort();
    }, [isRefetch, projectsData.page, projectsData.status, searchFilter, ongId]);

    return (
        <Box>
            <Box
                sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    gap: '1rem',
                    mb: '2rem'
                }}
            >
                <TextField
                    fullWidth
                    label="Procure pelo Nome do projeto"
                    sx={{
                        flex: 1,
                        backgroundColor: '#e7e7e7',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'transparent'
                            },
                            '&:hover fieldset': {
                                borderColor: 'transparent',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'transparent',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'black',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'green',
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={(e) => {
                        setSearchFilter(e.target.value)
                    }}
                />

                <TextField
                    label="Status do projeto"
                    select
                    sx={{
                        '& .MuiInputLabel-root': {
                            color: 'gray',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'green'
                        },
                        borderRadius: 2,
                        width: '15rem',
                        borderColor: '#E8E8E8'
                    }}
                    onChange={(e) => {
                        setProjectsData(prev => {
                            return {
                                ...prev,
                                status: e.target.value
                            }
                        })
                    }}
                >
                    <MenuItem value="ALL">TODOS</MenuItem>
                    <MenuItem value="WAITING">PENDENTES</MenuItem>
                    <MenuItem value="APPROVED">APROVADOS</MenuItem>
                    <MenuItem value="REPROVED">REPROVADOS</MenuItem>
                    <MenuItem value="INACTIVE">INATIVOS</MenuItem>
                </TextField>

                <Tooltip title="Recarregar">
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: '#E8E8E8'
                        }}
                        onClick={() => setIsRefetch(prev => !prev)}
                    >
                        <Replay
                            color="action"
                        />
                    </Button>
                </Tooltip>

            </Box>

            <Grid2 container spacing={2}>
                {!projectsData || isLoading ?
                    Array.from([1, 2, 3, 4].map((index) => (
                        <Grid2 key={index} size={6}>
                            <Skeleton height={350} variant="rounded" animation='wave' />
                        </Grid2>
                    )))
                    : projectsData.projects?.map((project, index) => (
                        <Grid2 key={index} size={{
                            xs: 12,
                            sm: 6
                        }}>
                            <CardProject
                                name={project.name}
                                description={project.description}
                                id={project.id}
                                imagePath={project.imagePath}
                                status={project.status}
                                ongName={project.Ong?.name}
                                ongId={project.Ong?.id}
                                ongImagePath={project.Ong?.imagePath}
                            />
                        </Grid2>
                    ))
                }

                <Grid2 size={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Pagination
                        count={Math.ceil(projectsData.count / PAGE_SIZE)} // Calcula o número de páginas
                        page={projectsData.page}
                        onChange={(e, value: number) => {
                            setProjectsData(prev => {
                                return {
                                    ...prev,
                                    page: value
                                }
                            })
                        }}
                        color="primary"
                        sx={{ marginTop: '20px', mb: '2rem' }}
                    />
                </Grid2>
            </Grid2>
        </Box >
    )
}