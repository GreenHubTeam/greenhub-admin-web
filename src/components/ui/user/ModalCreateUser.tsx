import { z } from "zod";
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { IUser } from "@/types/userTypes";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatCPF } from "@/utils/formatCPF";
import { isValdiCPF } from "@/utils/isValidCPF";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountCircle, AssignmentInd, Email, Lock } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid2, InputAdornment, MenuItem, TextField } from "@mui/material";

interface IModalCreateUser {
    open: boolean;
    handleClose: () => void;
    refetchDataGrid: () => void;
    userId: string | null;
}

const UserSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
    document: z.string().min(9, "Documento é obrigatório").refine((value: string) => isValdiCPF(value), { message: "Documento invalido" }),
    type: z.enum(["ADMIN", "DONOR"], { required_error: "Tipo de usuário é obrigatório", message: "Tipo de usuário é obrigatorio" }),
    email: z.string().email("Email inválido").min(10, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").max(30, "Senha deve ter no maximo 30 caracteres"),
    imagePath: z.string().optional()
});

type UserType = z.infer<typeof UserSchema>;

export default function ModalCreateUser({
    open,
    handleClose,
    refetchDataGrid,
    userId
}: IModalCreateUser) {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<UserType>({
        resolver: zodResolver(UserSchema),
        mode: 'onChange'
    });

    const handleRegisterUser = async (dataUser: UserType) => {
        try {
            if (userId) {
                await api.put(`/user/${userId}`, {
                    ...dataUser,
                    password: undefined
                });
            } else {
                await api.post('/user', {
                    name: dataUser.name,
                    document: dataUser.document,
                    type: dataUser.type,
                    email: dataUser.email,
                    password: dataUser.password
                });
            }

            toast.success(userId ? "Usuário Atualizado com sucesso" : "Usuário criado com sucesso");

            handleCloseCreate();
            refetchDataGrid();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("Error interno no servidor");
            }
        }
    }

    function handleCloseCreate() {
        reset();
        handleClose();
        setUserData(null);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/user/${userId}`);

                setUserData(response.data);

                setValue('name', response.data.name);
                setValue('document', formatCPF(response.data.document));
                setValue('email', response.data.email);
                setValue('type', response.data.type);
                setValue('password', '123456');
                clearErrors();
            } catch (error) {
                toast.error("Error ao trazer os dados do usuário");
                handleCloseCreate();
            } finally {
                setIsLoading(false);
            }
        }

        if (userId) {
            fetchUserData();
        } else {
            reset();
        }

        return () => new AbortController().abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isReload]);

    async function handleRemoveImage() {
        setIsLoading(true);
        try {
            await api.put(`/user/${userId}`, {
                imagePath: null
            });

            toast.success("Imagem removida com sucesso");
            setIsReload(prev => !prev);
            refetchDataGrid();
        } catch (error) {
            toast.error("Error ao remover imagem do usuário");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseCreate}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                {userId ? "Editar Usuário" : "Criar novo usuario"}
            </DialogTitle>

            <DialogContent>
                {isLoading ? (
                    <Box sx={{
                        padding: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <CircularProgress color="success" size={30} />
                    </Box>
                ) : (
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <Box sx={{
                                my: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                alignItems: 'center'
                            }}>
                                <Avatar
                                    sx={{
                                        height: '6rem',
                                        width: '6rem'
                                    }}
                                    src={`${env.base_url_api}/${userData?.imagePath}`}
                                />

                                {userData?.imagePath && (
                                    <Button
                                        variant="outlined"
                                        onClick={handleRemoveImage}
                                        sx={{
                                            fontSize: '.7rem'
                                        }}
                                    >
                                        Remover Foto
                                    </Button>
                                )}
                            </Box>
                        </Grid2>

                        <Grid2 size={12}>
                            <Box component='form' onSubmit={handleSubmit(handleRegisterUser)} >
                                <Grid2 container spacing={2}>
                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Nome"
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'green'
                                                },
                                                borderRadius: 2
                                            }}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AccountCircle sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                            {...register('name')}
                                        />
                                    </Grid2>

                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Documento"
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'green'
                                                },
                                                borderRadius: 2
                                            }}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AssignmentInd sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            error={!!errors.document}
                                            helperText={errors.document?.message}
                                            {...register('document')}
                                        />
                                    </Grid2>

                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'green'
                                                },
                                                borderRadius: 2
                                            }}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Email sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                            {...register('email')}
                                        />
                                    </Grid2>

                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Senha"
                                            type={!!userId ? 'password' : 'text'}
                                            disabled={!!userId}
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'green'
                                                },
                                                borderRadius: 2
                                            }}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Lock sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                            {...register('password')}
                                        />
                                    </Grid2>

                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Tipo de Usuário"
                                            select
                                            sx={{
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: 'green'
                                                },
                                                borderRadius: 2
                                            }}
                                            error={!!errors.type}
                                            helperText={errors.type?.message}
                                            {...register('type')}
                                        >
                                            <MenuItem value="ADMIN">Admin</MenuItem>
                                            <MenuItem value="DONOR">Doador</MenuItem>
                                        </TextField>
                                    </Grid2>

                                    <Grid2 size={12}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                gap: '1rem'
                                            }}
                                        >
                                            <Button
                                                type="button"
                                                onClick={handleCloseCreate}
                                                variant="outlined"
                                                disabled={isSubmitting}
                                                sx={{
                                                    height: '3.5rem',
                                                    borderRadius: '.7rem',
                                                    width: '10rem',
                                                    borderColor: 'gray',
                                                    color: 'black'
                                                }}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting}
                                                sx={{
                                                    backgroundColor: 'green',
                                                    boxShadow: 'none',
                                                    height: '3.5rem',
                                                    borderRadius: '.7rem',
                                                    width: '10rem',
                                                }}
                                            >
                                                {isSubmitting ? <CircularProgress color="success" size={24} /> : userId ? "Salvar Usuário" : "Criar usuario"}
                                            </Button>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </Box>

                        </Grid2>
                    </Grid2>
                )}
            </DialogContent>
        </Dialog >
    )
}