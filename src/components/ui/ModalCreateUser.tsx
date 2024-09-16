import { z } from "zod";
import { api } from "@/libs/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountCircle, AssignmentInd, Email, Lock } from "@mui/icons-material";
import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid2, InputAdornment, MenuItem, TextField } from "@mui/material";

interface IModalCreateUser {
    open: boolean;
    handleClose: () => void;
    refetchDataGrid: () => void;
}

const UserSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
    document: z.string().min(9, "Documento é obrigatório"),
    type: z.enum(["ADMIN", "DONOR"], { required_error: "Tipo de usuário é obrigatório", message: "Tipo de usuário é obrigatorio" }),
    email: z.string().email("Email inválido").min(10, "Email é obrigatório"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").max(30, "Senha deve ter no maximo 30 caracteres"),
    imagePath: z.string().optional()
});

type UserType = z.infer<typeof UserSchema>;

export default function ModalCreateUser({
    open,
    handleClose,
    refetchDataGrid
}: IModalCreateUser) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<UserType>({
        resolver: zodResolver(UserSchema)
    });

    const handleRegisterUser = async (dataUser: UserType) => {
        try {
            await api.post('/user', {
                user: {
                    name: dataUser.name,
                    document: dataUser.document,
                    type: dataUser.type,
                    email: dataUser.email,
                    password: dataUser.password
                }
            });

            handleClose();
            toast.success("Usuário criado com sucesso");
            refetchDataGrid();
            reset();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("Error interno no servidor");
            }
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth='md'
        >
            <DialogTitle>
                Criar novo usuario
            </DialogTitle>

            <DialogContent>
                <Grid2 container marginTop={1} spacing={2}>
                    <Grid2 size={12}>
                        <Box component='form' onSubmit={handleSubmit(handleRegisterUser)} >
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
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

                                <Grid2 size={6}>
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

                                <Grid2 size={6}>
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

                                <Grid2 size={6}>
                                    <TextField
                                        fullWidth
                                        label="Senha"
                                        type="text"
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
                                            justifyContent: 'end'
                                        }}
                                    >
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
                                            {isSubmitting ? <CircularProgress color="success" size={24} /> : 'Criar usuario'}
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </Grid2>
                </Grid2>
            </DialogContent>
        </Dialog >
    )
}