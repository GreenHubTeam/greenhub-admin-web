'use client'

import dayjs from "dayjs";
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { formatCNPJ } from "@/utils/formatCNPJ";
import { ModalCreateOng } from "@/components/ui/ong/ModalCreateOng";
import { ModalDeleteOng } from "@/components/ui/ong/ModalDeleteOng";
import { Add, Delete, Mode, Replay, Search } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Avatar, Box, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";

export default function OngComponent() {
    const [dataOng, setDataOng] = useState({
        ongs: [],
        count: 0,
        pageModel: {
            page: 0,
            pageSize: 10
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isRefetch, setIsRefetch] = useState(false);
    const { searchFilter, setSearchFilter } = useSearch();
    const [isOpenModalCreateOng, setIsOpenModalCreateOng] = useState(false);
    const [isOpenModalDeleteOng, setIsOpenModalDeleteOng] = useState(false);
    const [user, setUser] = useState<{ userId: string, ongId: string } | null>(null);

    const handleOpenDeleteModal = () => {
        setIsOpenModalDeleteOng(true);
    }

    const handleCloseDeleteModal = () => {
        setUser(null);
        setIsOpenModalDeleteOng(false);
    }

    const handleCloseCreateModal = () => {
        setUser(null);
        setIsOpenModalCreateOng(false);
    }

    const handleOpenCreateModal = () => {
        setIsOpenModalCreateOng(true);
    }

    function refetchDataGrid() {
        setIsRefetch(prev => !prev);
    }

    useEffect(() => {
        const fetchOngs = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get('/ong', {
                    params: {
                        page: dataOng.pageModel.page,
                        pageSize: dataOng.pageModel.pageSize,
                        search: searchFilter
                    }
                });

                setDataOng(prev => {
                    return {
                        ...prev,
                        ongs: data.ongs,
                        count: data.count,
                    }
                });
            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Error interno no servidor");
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchOngs();

        return () => new AbortController().abort();
    }, [isRefetch, searchFilter, dataOng.pageModel]);

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Nome",
            resizable: false,
            flex: 2,
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            gap: '1rem'
                        }}
                    >
                        <Avatar
                            src={`${env.base_url_api}/${params.row.imagePath}`}
                            alt={params.row.name}
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
                                {params.row.name}
                            </Typography>
                            <Typography sx={{ color: 'gray', fontSize: '.7rem' }}>
                                {params.row.User?.email}
                            </Typography>
                        </Box>
                    </Box>
                )
            },
        },
        {
            field: "document",
            headerName: "Documento",
            resizable: false,
            flex: 1,
            valueFormatter: (value: string) => formatCNPJ(value)
        },
        {
            field: "createdAt",
            headerName: "Criado em",
            resizable: false,
            flex: 1,
            valueFormatter: (value: Date) => dayjs(value).format('DD/MM/YYYY - HH:mm')
        },
        {
            field: "updatedAt",
            headerName: "Atualizado em",
            resizable: false,
            flex: 1,
            valueFormatter: (value: Date) => dayjs(value).format('DD/MM/YYYY - HH:mm')
        },
        {
            field: 'actions',
            headerName: 'Ações',
            headerAlign: 'center',
            width: 100,
            resizable: false,
            renderCell(params: GridRenderCellParams) {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '.3rem',
                            height: '100%'
                        }}
                    >
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={() => {
                                    setUser({
                                        userId: params.row.User.id,
                                        ongId: params.row.id
                                    });
                                    handleOpenCreateModal();
                                }}
                            >
                                <Mode color="action" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton
                                onClick={() => {
                                    setUser({
                                        userId: params.row.User.id,
                                        ongId: params.row.id
                                    });
                                    handleOpenDeleteModal();
                                }}
                            >
                                <Delete color="error" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            },
        }
    ];

    return (
        <>
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant="h4" fontWeight={700}>
                        Lista de ONGs
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={handleOpenCreateModal}
                        sx={{
                            backgroundColor: 'green',
                            boxShadow: 'none'
                        }}
                        startIcon={<Add />}
                    >
                        Criar ONG
                    </Button>
                </Box>

                <Box
                    sx={{
                        marginTop: '2rem',
                        display: 'flex',
                        gap: '1rem'
                    }}
                >
                    <TextField
                        fullWidth
                        label="Procure pelo (Nome , documento, email)"
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

                <Box
                    sx={{
                        marginTop: '2rem'
                    }}
                >
                    <DataGrid
                        disableColumnSorting
                        disableColumnMenu
                        rowHeight={75}
                        rows={dataOng.ongs}
                        columns={columns}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'circular-progress',
                                noRowsVariant: 'circular-progress',
                            },
                        }}
                        pagination
                        paginationMode="server"
                        paginationModel={dataOng.pageModel}
                        onPaginationModelChange={(model) => setDataOng(prev => {
                            return {
                                ...prev,
                                pageModel: {
                                    page: model.page,
                                    pageSize: model.pageSize
                                }
                            }
                        })}
                        loading={isLoading}
                        rowCount={dataOng.count}
                        autoHeight
                        pageSizeOptions={[10, 15, 20]}
                    />
                </Box>
            </Box>

            <ModalCreateOng
                open={isOpenModalCreateOng}
                handleClose={handleCloseCreateModal}
                refetchDataGrid={refetchDataGrid}
                user={user}
            />

            <ModalDeleteOng
                handleClose={handleCloseDeleteModal}
                open={isOpenModalDeleteOng}
                refetchDataGrid={refetchDataGrid}
                user={user}
            />
        </>
    )
}