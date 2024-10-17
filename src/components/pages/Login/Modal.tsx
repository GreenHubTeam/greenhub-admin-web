'use client'

import { api } from "@/libs/axios";
import { useEffect, useState } from "react";
import { IPoliciesType } from "@/types/policiesTypes";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from "@mui/material";

export function ModalLoginComponent() {
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [policiesData, setPoliciesData] = useState<IPoliciesType | null>(null);

    const handleClickOpen = (contentType: 'lgpd' | 'policies' | 'terms') => {
        if (contentType === 'policies') {
            setContent(policiesData?.policies ?? "");
            setTitle("Politicas da plataforma")
        }

        if (contentType === 'terms') {
            setContent(policiesData?.useterms ?? "")
            setTitle("Termos de uso")
        }

        if (contentType === 'lgpd') {
            setContent(policiesData?.lgpd ?? "")
            setTitle("LGPD")
        }

        setOpen(true);
    };

    useEffect(() => {
        const fetchPoliciesData = async () => {
            try {
                const { data } = await api.get('/params');

                setPoliciesData(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPoliciesData();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            <Box
                sx={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('policies')}>
                    POLITICAS
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('terms')}>
                    TERMOS DE USO
                </Button>

                <Divider orientation="vertical" flexItem variant="middle" />
                <Button variant="text" sx={{ color: 'gray' }} onClick={() => handleClickOpen('lgpd')}>
                    LGPD
                </Button>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {!policiesData ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '150px',
                            padding: '2rem'
                        }}
                    >
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <>
                        <DialogTitle id="alert-dialog-title">
                            {title}
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                component='div'
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} autoFocus>
                                Aceitar
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    )
}