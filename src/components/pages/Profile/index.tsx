'use client'

import { z } from "zod";
import Image from "next/image";
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { formatCPF } from "@/utils/formatCPF";
import { isValdiCPF } from "@/utils/isValidCPF";
import { zodResolver } from "@hookform/resolvers/zod";
import bannerProfile from '../../../../public/bannerProfile.jpg';
import { AssignmentInd, Email, Person, PhotoCamera } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Card, CardContent, Chip, Grid2, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

const profileSchema = z.object({
    name: z.string().min(3, "Nome é obrigatório"),
    document: z.string().min(9, "Documento é obrigatório").refine((value: string) => isValdiCPF(value), { message: "Documento invalido" }),
    email: z.string().email("Email inválido").min(10, "Email é obrigatório"),
});

type profileTypeForm = z.infer<typeof profileSchema>

export default function ProfileComponent() {
    const { userData: user, profileImage, setProfileImage, setUserData } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue
    } = useForm<profileTypeForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name,
            document: user?.document,
            email: user?.email,
        }
    });

    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('document', user.document)
            setValue('email', user.email)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    async function handleEditProfile(formData: profileTypeForm) {
        try {
            const { data } = await api.put(`/user/${user?.id}`, {
                name: formData.name,
                email: formData.email,
                document: formData.document
            });

            setValue('name', data.user.name);
            setValue('email', data.user.email);
            setValue('document', data.user.document);

            setUserData(data.user);
            toast.success("Usuario atualizado com sucesso");
        } catch (error) {
            toast.error("Error ao atualizar usuario");
        }
    }

    const handleFileChange = async (event: React.FormEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('profile-image', file);

            setIsLoading(true);

            try {
                const { data } = await api.put(`/user/profile-image/${user?.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setProfileImage(`${env.base_url_api}/${data.user.imagePath}`);

                toast.success("Foto de perfil atualizada com sucesso");
            } catch (error) {
                toast.error("Erro ao mudar foto de perfil");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '300px',
                    position: 'relative',
                }}
            >
                <Box
                    component={Image}
                    alt="teste"
                    src={bannerProfile}
                    fill
                    priority
                    sx={{ objectFit: 'cover', borderRadius: '2rem' }}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginTop: '-3.5rem',
                    paddingLeft: '3rem',
                    zIndex: 1,
                }}
            >
                <Avatar
                    src={profileImage}
                    alt="Foto de perfil"
                    sx={{ height: '100px', width: '100px' }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.4rem',
                        alignItems: 'start'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{ color: 'white', fontWeight: '700' }}
                    >
                        {user?.name}
                    </Typography>

                    <Chip label="administrador" color="primary" />
                </Box>
            </Box>

            <Grid2 mt={4} container spacing={3}>
                <Grid2 size={4}>
                    <Card
                        variant="outlined"
                    >
                        <CardContent>
                            <Typography variant="h6">
                                Sobre
                            </Typography>

                            <Typography
                                display='flex'
                                alignItems='center'
                                gap={1}
                                fontSize='1.1rem'
                            >
                                <AssignmentInd />
                                {formatCPF(user?.document || "")}
                            </Typography>

                            <Typography
                                display='flex'
                                alignItems='center'
                                gap={1}
                                fontSize='1.1rem'
                            >
                                <Email />
                                {user?.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 size={8}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" mb={3}>
                                Editar Perfil
                            </Typography>

                            <Box
                                sx={{
                                    mt: 2,
                                    mb: 4,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <IconButton
                                            color="primary"
                                            aria-label="upload picture"
                                            component="label"
                                            sx={{
                                                backgroundColor: 'white',
                                                boxShadow: 3,
                                                '&:hover': { backgroundColor: 'gray' }
                                            }}
                                            disabled={isLoading}
                                        >
                                            <Box
                                                component='input'
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onInput={handleFileChange}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                    }
                                    sx={{

                                    }}
                                >
                                    <Avatar
                                        alt="User Avatar"
                                        src={profileImage}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                </Badge>
                            </Box>

                            <Box
                                component='form'
                                onSubmit={handleSubmit(handleEditProfile)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '2rem'
                                }}
                            >
                                <TextField
                                    disabled={isSubmitting || isLoading}
                                    helperText={!!errors.name && errors.name.message}
                                    {...register('name')}
                                    error={!!errors.name}
                                    fullWidth
                                    label="Nome"
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
                                                    <Person />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <TextField
                                    disabled={isSubmitting || isLoading}
                                    {...register('document')}
                                    error={!!errors.document}
                                    helperText={!!errors.document && errors.document.message}
                                    fullWidth
                                    label="Documento"
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
                                                    <AssignmentInd />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <TextField
                                    disabled={isSubmitting || isLoading}
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={!!errors.email && errors.email.message}
                                    fullWidth
                                    label="Email"
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
                                                    <Email />
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'end'
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ backgroundColor: 'green' }}
                                    >
                                        Salvar
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box >
    )
}