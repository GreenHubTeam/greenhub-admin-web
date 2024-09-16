'use client'

import { api } from "@/libs/axios";
import useSearch from "./useSearch";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ModalCreateUser from "@/components/ui/ModalCreateUser";
import { Add, MoreVert, Replay, Search } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";

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
    const [isOpenModal, setIsOpenModal] = useState(false);
    const { searchFilter, setSearchFilter } = useSearch();

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleOpen = () => {
        setIsOpenModal(true);
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

    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Nome",
            resizable: false,
            flex: 1
        },
        {
            field: "type",
            headerName: "Tipo",
            resizable: false,
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            resizable: false,
            flex: 1
        },
        {
            field: "document",
            headerName: "Documento",
            resizable: false,
            flex: 1
        },
        {
            field: 'actions',
            headerName: 'Ações',
            headerAlign: 'center',
            width: 100,
            resizable: false,
            renderCell(params: any) {
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </Box>
                )

            },
        }
    ]

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
                        onClick={handleOpen}
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
                            width: '15rem'
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
                        <MenuItem value="ONG">ONG</MenuItem>
                    </TextField>

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
                </Box>

                <Box
                    sx={{
                        marginTop: '2rem'
                    }}
                >
                    <DataGrid
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
                open={isOpenModal}
                handleClose={handleClose}
            />
        </>
    )
}