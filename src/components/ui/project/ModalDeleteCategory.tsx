import { useState } from "react";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { ArrowBack, Delete } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface IModalDeleteCategoryProps {
    open: boolean;
    onClose: () => void;
    refetch: () => void;
    categoryId?: number | null;
}

export default function ModalDeleteCategory({ open, onClose, refetch, categoryId }: IModalDeleteCategoryProps) {
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteCategory = async () => {
        setIsLoading(true);
        try {
            await api.delete(`/category/${categoryId}`);

            toast.success("Categoria deletada com sucesso");

            refetch();
        } catch (error) {
            toast.error("Error ao excluir essa categoria");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Você deseja realmente deletar essa categoria</DialogTitle>

            <DialogContent>
                <Typography variant="body2">
                    Você tem certeza de que deseja excluir a categoria de projeto ? Essa ação é irreversível e pode impactar projetos que estejam utilizando essa categoria. Ao excluir, todos os projetos associados a essa categoria precisarão ser reclassificados.
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    endIcon={<ArrowBack />}
                    onClick={onClose}
                    disabled={isLoading}
                    color="inherit"
                >
                    Cancelar
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    endIcon={<Delete />}
                    onClick={() => handleDeleteCategory}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} color="success" /> : "Excluir"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}