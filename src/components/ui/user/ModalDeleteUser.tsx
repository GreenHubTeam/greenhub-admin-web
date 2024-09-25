import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { IUser } from "@/types/userTypes";
import { useEffect, useState } from "react";
import { Avatar, Box, Button, Chip, CircularProgress, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";

interface IModalDelete {
    isOpenModal: boolean;
    handleClose: () => void;
    userId: string | null;
    refetchDataGrid: () => void;
}

export function ModalDelete({
    isOpenModal,
    handleClose,
    userId,
    refetchDataGrid
}: IModalDelete) {
    const [userData, setUserData] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/user/${userId}`);

                setUserData(response.data);
            } catch (error) {
                toast.error("Error ao trazer os dados do usuário");
                handleClose();
            } finally {
                setIsLoading(false);
            }
        }

        if (userId) {
            fetchUserData();
        }

        return () => new AbortController().abort();
    }, [userId, handleClose]);

    async function handleDeleteUser() {
        setIsDeleting(true);
        try {
            await api.delete(`/user/${userId}`);

            toast.success("Usuário deletado com sucesso");
        } catch (error) {
            toast.error("Error ao deletar o usuário");
        } finally {
            setIsDeleting(false);
            handleClose();
            refetchDataGrid();
        }
    }

    return (
        <Dialog
            open={isOpenModal}
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
                                    <Avatar src={`${env.base_url_api}/${userData?.imagePath}`} alt={userData?.name} />

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography>
                                            {userData?.name}
                                        </Typography>
                                        <Typography sx={{ color: 'gray', fontSize: '.7rem' }}>
                                            {userData?.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Chip
                                    label={userData?.type}
                                    sx={{
                                        backgroundColor: userData?.type === 'ADMIN' ? '#222222' : 'green',
                                        color: 'white'
                                    }}
                                />

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