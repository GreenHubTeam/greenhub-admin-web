'use client'

import { api } from '@/libs/axios';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowBack, SaveAs } from '@mui/icons-material';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { Box, Button, CircularProgress, Typography } from '@mui/material';

export default function PolicyEditorPage({ policie }: { policie: string }) {
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const router = useRouter();

    const handleEditPolicies = async () => {
        try {
            await api.put(`/params/${policie}`, {
                content
            });

            toast.success("Politica atualizada com sucesso");
            router.push('/hub/policies')
        } catch (error) {
            toast.error("Error ao atualizar a politica");
        }
    }

    useEffect(() => {
        const fetchPolicyData = async () => {
            setIsLoading(true);
            try {
                const { data } = await api.get('/params');

                setContent(data[policie]);
            } catch (error) {
                toast.error("Erro ao buscar dados da politica");
            } finally {
                setIsLoading(false);
            }
        }

        fetchPolicyData();
    }, [policie]);

    return (
        <Box>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography variant="h4" fontWeight={700}>
                    Editar Política
                </Typography>
            </Box>

            <Box my='2rem'>
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px'
                        }}
                    >
                        <CircularProgress color='success' />
                    </Box>
                ) : (
                    <ReactQuill
                        theme='snow'
                        value={content}
                        onChange={handleContentChange}
                    />
                )}

            </Box>

            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                }}
            >
                <Button
                    disabled={isLoading}
                    startIcon={<ArrowBack />}
                    variant='outlined'
                    color='inherit'
                    onClick={() => router.push('/hub/policies')}
                >
                    Voltar
                </Button>
                <Button
                    disabled={isLoading}
                    startIcon={<SaveAs />}
                    variant='contained'
                    color='success'
                    onClick={() => handleEditPolicies()}>
                    Salvar
                </Button>
            </Box>
        </Box >
    );
};
