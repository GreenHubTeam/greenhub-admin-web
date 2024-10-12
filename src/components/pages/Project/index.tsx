'use client'

import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IProject } from "@/types/projectTypes";
import { CardProject } from "@/components/ui/cardProject";
import { Box, Grid2, Skeleton, Typography } from "@mui/material";

export default function ProjectPage() {
    const [projectsData, setProjectsData] = useState<IProject[] | null>(null);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/project/all');

            setProjectsData(response.data.projects);
        } catch (error) {
            toast.error("Error ao buscar os projetos");
        }
    };

    useEffect(() => {
        fetchProjects()
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight={700}
                mb="2rem"
            >
                Lista de Projetos
            </Typography>

            <Grid2 container spacing={2}>
                {!projectsData ?
                    Array.from([1, 2, 3, 4].map((index) => (
                        <Grid2 key={index} size={6}>
                            <Skeleton height={350} variant="rounded" animation='wave' />
                        </Grid2>
                    )))
                    : projectsData.map((project, index) => (
                        <Grid2 key={index} size={6}>
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
                    ))}
            </Grid2>
        </Box >
    )
}