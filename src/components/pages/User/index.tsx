'use client'

import dayjs from 'dayjs';
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import useSearch from "@/hooks/useSearch";
import { useEffect, useState } from "react";
import { formatCPF } from "@/utils/formatCPF";
import { ModalDelete } from '@/components/ui/user/ModalDeleteUser';
import ModalCreateUser from "@/components/ui/user/ModalCreateUser";
import { Add, Delete, Mode, Replay, Search } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Avatar, Box, Button, Chip, IconButton, InputAdornment, MenuItem, TextField, Tooltip, Typography } from "@mui/material";

export default function UserComponent() {
    const [dataUser, setDataUser] = useState({
        users: [],
        count: 0,
        userType: "",
        pageModel: {
            page: 0,
            pageSize: 10
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetch, setIsRefetch] = useState(false);

    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);

    const { searchFilter, setSearchFilter } = useSearch();
    const [userId, setUserId] = useState(null);

    const handleOpenDeleteModal = () => {
        setIsOpenModalDelete(true);
    }

    const handleCloseDeleteModal = () => {
        setUserId(null);
        setIsOpenModalDelete(false);
    }

    const handleCloseCreateModal = () => {
        setUserId(null);
        setIsOpenModalCreate(false);
    }

    const handleOpenCreateModal = () => {
        setIsOpenModalCreate(true);
    }

    function refetchDataGrid() {
        setIsRefetch(prev => !prev);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get('/user', {
                    params: {
                        page: dataUser.pageModel.page,
                        pageSize: dataUser.pageModel.pageSize,
                        userType: dataUser.userType,
                        search: searchFilter
                    }
                });

                setDataUser(prev => {
                    return {
                        ...prev,
                        users: data.users,
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

        fetchUsers();

        return () => new AbortController().abort();
    }, [isRefetch, searchFilter, dataUser.userType, dataUser.pageModel]);

    const getRandomProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
            "/profile6.png"
        ];
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
    };

    const CustomAvatar = ({ imagePath, name }: { imagePath: string, name: string }) => {
        const [avatarSrc, setAvatarSrc] = useState(`${env.base_url_api}/${imagePath}`);

        return (
            <Avatar
                src={avatarSrc}
                alt={name}
                onError={() => setAvatarSrc(getRandomProfileImage())}
                sx={{ cursor: 'pointer' }}
            />
        );
    };

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
                            gap: '1rem',
                        }}
                    >
                        <CustomAvatar imagePath={params.row.imagePath} name={params.row.name} />

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography>
                                {params.row.name}
                            </Typography>
                            <Typography sx={{ color: 'gray', fontSize: '.7rem' }}>
                                {params.row.email}
                            </Typography>
                        </Box>
                    </Box>
                )
            },
        },
        {
            field: "type",
            headerName: "Tipo",
            resizable: false,
            width: 120,
            align: 'center',
            renderCell: (params: GridRenderCellParams) => {
                return (
                    <Chip
                        label={params.row.type}
                        sx={{
                            backgroundColor: params.row.type === 'ADMIN' ? '#222222' : 'green',
                            color: 'white'
                        }}
                    />
                )
            }
        },
        {
            field: "document",
            headerName: "Documento",
            resizable: false,
            flex: 1,
            valueFormatter: (value: string) => formatCPF(value)
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
                            <IconButton onClick={() => {
                                setUserId(params.row.id);
                                handleOpenCreateModal();
                            }} >
                                <Mode color="action" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton onClick={() => {
                                setUserId(params.row.id);
                                handleOpenDeleteModal()
                            }}>
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
                        Lista de Usuários
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: 'green',
                            boxShadow: 'none'
                        }}
                        startIcon={<Add />}
                        onClick={handleOpenCreateModal}
                    >
                        Criar usuário
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
                                color: 'black',               // Define a cor do label
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'green',              // Cor do label quando focado
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
                        label="Tipo de Usuário"
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
                        value={dataUser?.userType || ''}
                        onChange={(e) => {
                            setDataUser(prev => {
                                return {
                                    ...prev,
                                    userType: e.target.value
                                }
                            })
                        }}
                    >
                        <MenuItem value="ALL">Todos</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                        <MenuItem value="DONOR">Doador</MenuItem>
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

                <Box
                    sx={{
                        marginTop: '2rem'
                    }}
                >
                    <DataGrid
                        disableColumnSorting
                        disableColumnMenu
                        rowHeight={75}
                        rows={dataUser.users}
                        columns={columns}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'circular-progress',
                                noRowsVariant: 'circular-progress',
                            },
                        }}
                        pagination
                        paginationMode="server"
                        paginationModel={dataUser.pageModel}
                        onPaginationModelChange={(model) => setDataUser(prev => {
                            return {
                                ...prev,
                                pageModel: {
                                    page: model.page,
                                    pageSize: model.pageSize
                                }
                            }
                        })}
                        loading={isLoading}
                        rowCount={dataUser.count}
                        autoHeight
                        pageSizeOptions={[10, 15, 20]}
                    />
                </Box>
            </Box>

            <ModalCreateUser
                refetchDataGrid={refetchDataGrid}
                open={isOpenModalCreate}
                handleClose={handleCloseCreateModal}
                userId={userId}
            />

            <ModalDelete
                handleClose={handleCloseDeleteModal}
                isOpenModal={isOpenModalDelete}
                userId={userId}
                refetchDataGrid={refetchDataGrid}
            />
        </>
    )
}