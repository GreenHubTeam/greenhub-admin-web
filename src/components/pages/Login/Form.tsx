'use client'

import { z } from 'zod';
import { useState } from "react";
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Visibility, VisibilityOff, Key } from '@mui/icons-material';
import { Alert, Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";

const schemaLogin = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(4, "Minimo 4 caracteres"),
    remember: z.boolean()
});

type loginTypeData = z.infer<typeof schemaLogin>;

export function FormLoginComponent() {
    const searchParams = useSearchParams();
    const error = searchParams.get('error');
    const [isLoading, setIsLoading] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<loginTypeData>({
        resolver: zodResolver(schemaLogin)
    });

    async function handleLogin(data: loginTypeData) {
        setIsLoading(true);
        signIn('credentials',
            { email: data.email, password: data.password, callbackUrl: '/hub' }
        ).then(() => {
            console.log("Login efetuado com sucesso");
        }).catch((err) => {
            console.log("Login efetuado com falha", err);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <Box
            component='form'
            onSubmit={handleSubmit(handleLogin)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}
        >

            {error &&
                <Alert variant="filled" severity="error">
                    Email ou senha invalidos
                </Alert>
            }

            <TextField
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
                                <Mail sx={{ color: 'green' }} />
                                <Divider flexItem orientation="vertical" />
                            </InputAdornment>
                        ),
                    },
                }}
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
            />
            <TextField
                label="Senha"
                type={isShowPassword ? 'text' : 'password'}
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
                                <Key sx={{ color: 'green' }} />
                                <Divider flexItem orientation="vertical" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end" onClick={() => setIsShowPassword(!isShowPassword)}>
                                <IconButton>
                                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
            />

            < Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.5rem'
                }}
            >
                <FormControlLabel
                    control={<Checkbox
                        size='medium'
                        {...register('remember')}
                        color='success'
                    />}
                    label="Lembrar me"
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isLoading}
                    sx={{ backgroundColor: 'green', boxShadow: 'none', height: '3.5rem', borderRadius: '.7rem' }}
                >
                    {isLoading ? <CircularProgress color="success" size={24} /> : 'Entrar'}
                </Button>
            </Box >

        </Box >
    )
}
