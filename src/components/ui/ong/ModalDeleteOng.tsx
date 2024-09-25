import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IOngType } from "@/types/ongTypes";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";

interface IModalCreateOng {
    open: boolean;
    handleClose: () => void;
    refetchDataGrid: () => void;
    user: {
        userId: string | null,
        ongId: string | null
    } | null
}

export function ModalDeleteOng({
    open,
    handleClose,
    user,
    refetchDataGrid
}: IModalCreateOng) {
    const [ongData, setOngData] = useState<IOngType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchOngData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/ong/${user?.ongId}`);

                setOngData(response.data);
            } catch (error) {
                toast.error("Error ao trazer os dados do usuário");
                handleClose();
            } finally {
                setIsLoading(false);
            }
        }

        if (user?.ongId) {
            fetchOngData();
        }

        return () => new AbortController().abort();

    }, [user?.ongId, handleClose]);

    async function handleDeleteUser() {
        setIsDeleting(true);
        try {
            await api.delete(`/user/${user?.userId}`);

            toast.success("ONG deletado com sucesso");
        } catch (error) {
            toast.error("Error ao deletar o ONG");
        } finally {
            setIsDeleting(false);
            handleClose();
            refetchDataGrid();
        }
    }

    return (
        <Dialog
            open={open}
            onClose={() => handleClose()}
            maxWidth='xs'
            fullWidth
        >
            <DialogTitle>
                Deletar
            </DialogTitle>
            <DialogContent>
                {
                    isLoading ? (
                        <Box sx={{
                            padding: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CircularProgress color="success" size={30} />
                        </Box>
                    ) : (
                        <>
                            <Paper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    backgroundColor: '#DFDFDF',
                                    borderRadius: '8px',
                                    padding: '1rem'
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}>
                                    <Avatar src={`${env.base_url_api}/${ongData?.imagePath}`} alt={ongData?.name} />

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography>
                                            {ongData?.name}
                                        </Typography>
                                        <Typography sx={{ color: 'gray', fontSize: '.7rem' }}>
                                            {ongData?.User.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    alignItems: 'center',
                                    marginTop: '1rem',
                                    gap: '1rem'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleDeleteUser}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? <CircularProgress color="success" size={24} /> : "Deletar"}
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: '1px solid gray',
                                        color: 'black'
                                    }}
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </>
                    )
                }
            </DialogContent >
        </Dialog >
    )
}