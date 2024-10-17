'use client'

import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import ModalDeleteCategory from "@/components/ui/project/ModalDeleteCategory";
import ModalCreateCategory from "@/components/ui/project/ModalCreateCategory";
import { Box, Button, Card, CardContent, Divider, Grid2, IconButton, Tooltip, Typography } from "@mui/material";

export default function CategoriesPage() {
    const [isRefetch, setIsRefetch] = useState(false);
    const [isOpenModalCreateCategory, setIsOpenModalCreateCategory] = useState(false);
    const [isOpenModalDeleteCategory, setIsOpenModalDeleteCategory] = useState(false);
    const [categoriesData, setCategoriesData] = useState([{ id: 1, name: "TESTE" }]);

    const [categoryId, setCategoryId] = useState<number | null>(null);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                const { data } = await api.get('/category');

                setCategoriesData(data);
            } catch (error) {
                toast.error("Error ao buscar as categorias");
            }
        }

        fetchCategoriesData();

        return () => new AbortController().abort();
    }, [isRefetch]);

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    Lista de Categorias
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        boxShadow: 'none'
                    }}
                    startIcon={<Add />}
                    onClick={() => setIsOpenModalCreateCategory(true)}
                >
                    Criar Categoria
                </Button>
            </Box>

            <Grid2 mt='2rem' container spacing={2}>
                {
                    categoriesData.length > 0 && categoriesData.map((cat, index) => (
                        <Grid2 key={index} size={4}>
                            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="h6">
                                        {cat.name}
                                    </Typography>

                                    <Divider sx={{ my: '1rem' }} />

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1rem',
                                            justifyContent: 'end'
                                        }}
                                    >
                                        <Tooltip title="Editar">
                                            <IconButton
                                                onClick={() => {
                                                    setCategoryId(cat.id);
                                                    setIsOpenModalCreateCategory(true);
                                                }}
                                                sx={{
                                                    backgroundColor: '#fca503',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'darkorange',
                                                        color: 'white',
                                                    }
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Excluir">
                                            <IconButton
                                                sx={{
                                                    backgroundColor: 'red',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'darkred',
                                                        color: 'white',
                                                    }
                                                }}
                                                onClick={() => setIsOpenModalDeleteCategory(true)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))
                }
            </Grid2>

            <ModalCreateCategory
                open={isOpenModalCreateCategory}
                onClose={() => {
                    setIsOpenModalCreateCategory(false)
                    setCategoryId(null)
                }}
                refetch={() => setIsRefetch(prev => !prev)}
                categoryId={categoryId}
            />

            <ModalDeleteCategory
                onClose={() => {
                    setIsOpenModalDeleteCategory(false)
                    setCategoryId(null)
                }}
                open={isOpenModalDeleteCategory}
                refetch={() => setIsRefetch(prev => !prev)}
                categoryId={categoryId}
            />
        </Box>
    )
}