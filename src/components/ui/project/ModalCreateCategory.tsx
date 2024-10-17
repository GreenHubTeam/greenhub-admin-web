import { z } from "zod";
import { useEffect } from "react";
import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DriveFileRenameOutline } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, InputAdornment, TextField } from "@mui/material";

const createCategorySchema = z.object({
    name: z.string().min(4, "Nome da categoria é obrigatorio").max(100, "Numero maximo de caracteres atingido")
});

type createCategoryType = z.infer<typeof createCategorySchema>;

interface IModalCreateCategoryProps {
    open: boolean;
    onClose: () => void;
    refetch: () => void;
    categoryId?: number | null;
}

export default function ModalCreateCategory({ open, onClose, refetch, categoryId }: IModalCreateCategoryProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue
    } = useForm<createCategoryType>({
        resolver: zodResolver(createCategorySchema)
    });

    const handleCreateCategory = async (data: createCategoryType) => {
        try {
            {
                categoryId ?
                    await api.put(`/category/${categoryId}`, {
                        name: data.name
                    }) :
                    await api.post('/category', {
                        name: data.name
                    });
            }

            if (categoryId) {
                toast.success("Categoria Atualizada com sucesso");
            } else {
                toast.success("Categoria criada com sucesso!");
            }

            onClose();
            refetch();
        } catch (error) {
            if (categoryId) {
                toast.success("Error ao atualizar uma categoria");
            } else {
                toast.success("Error ao criar uma categoria");
            }
        } finally {
            reset();
        }
    };

    useEffect(() => {
        const fetchCategoryDataById = async () => {
            try {
                const { data } = await api.get(`/category/${categoryId}`);

                setValue('name', data.name);
            } catch (error) {
                toast.error('Error ao buscar nome da categoria');
            }
        }

        if (categoryId) {
            fetchCategoryDataById();
        } else {
            reset();
        }

        return () => new AbortController().abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId])

    return (
        <Dialog
            maxWidth='md'
            fullWidth
            open={open}
            onClose={onClose}
        >
            <DialogTitle>{categoryId ? "Editar uma categoria" : "Criar uma categoria"}</DialogTitle>
            <DialogContent>
                <Box
                    component='form'
                    onSubmit={handleSubmit(handleCreateCategory)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}
                >
                    <Divider />
                    <TextField
                        disabled={isSubmitting}
                        helperText={!!errors.name && errors.name.message}
                        {...register('name')}
                        error={!!errors.name}
                        fullWidth
                        label="Nome"
                        sx={{
                            flex: 1,
                            borderRadius: '8px',
                        }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <DriveFileRenameOutline />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'center',
                            gap: '1rem',
                            mt: '1rem'
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                        >
                            {categoryId ? "Salvar" : "Criar"}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}