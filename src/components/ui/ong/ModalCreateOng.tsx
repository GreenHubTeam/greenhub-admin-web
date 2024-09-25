import { z } from "zod";
import { env } from "@/env/env";
import { api } from "@/libs/axios";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IOngType } from "@/types/ongTypes";
import { useEffect, useState } from "react";
import { isValdiCPF } from "@/utils/isValidCPF";
import { isValidCEP } from "@/utils/isValidCEP";
import { isValidCNPJ } from "@/utils/isValidCNPJ";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid2, InputAdornment, TextField, Typography } from "@mui/material";
import { AddRoad, AssignmentInd, Badge, Call, CorporateFare, Email, EmojiTransportation, Flag, FmdGood, HolidayVillageOutlined, HomeWork, LocationCity, Password, Person, ThreeP } from "@mui/icons-material";

interface IModalCreateOng {
    open: boolean;
    handleClose: () => void;
    refetchDataGrid: () => void;
    user: {
        userId: string | null,
        ongId: string | null
    } | null
}

const FormOngCreateSchema = z.object({
    nameOng: z.string().min(2, "Minimo de 2 caracteres"),
    documentOng: z.string().min(2, "Minimo de 2 caracteres").refine((value) => isValidCNPJ(value), { message: "Insira um cnpj valido" }),
    aboutOng: z.string().min(2, "Minimo de 2 caracteres"),
    cityOng: z.string().min(2, "Minimo de 2 caracteres"),
    districtOng: z.string().min(2, "Minimo de 2 caracteres"),
    numberOng: z.string().min(2, "Minimo de 2 caracteres"),
    stateOng: z.string().min(2, "Minimo de 2 caracteres"),
    streetOng: z.string().min(2, "Minimo de 2 caracteres"),
    zipcodeOng: z.string().min(2, "Minimo de 2 caracteres").refine((value) => isValidCEP(value), { message: "Insira um cep valido" }),
    complementOng: z.string().min(2, "Minimo de 2 caracteres").optional(),
    telephoneOng: z.string().min(2, "Minimo de 2 caracteres"),
    nameUser: z.string().min(2, "Minimo de 2 caracteres"),
    emailUser: z.string().min(2, "Minimo de 2 caracteres"),
    passwordUser: z.string().min(2, "Minimo de 2 caracteres"),
    documentUser: z.string().min(2, "Minimo de 2 caracteres").refine((value) => isValdiCPF(value), { message: "Insira um cpf valido" }),
});

type FormOngType = z.infer<typeof FormOngCreateSchema>;

export function ModalCreateOng({
    open,
    handleClose,
    refetchDataGrid,
    user
}: IModalCreateOng) {
    const [ongData, setOngData] = useState<IOngType | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const [refreshPage, setIsRefreshPage] = useState(false);

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm<FormOngType>({
        resolver: zodResolver(FormOngCreateSchema),
        mode: 'onChange'
    });

    const watchCEP = watch('zipcodeOng');

    function handleCloseCreate() {
        reset();
        handleClose();
        setOngData(null);
    };

    const handleRegisterOng = async (data: FormOngType) => {
        const body = {
            user: {
                name: data.nameUser,
                email: data.emailUser,
                password: user?.ongId ? undefined : data.passwordUser,
                document: data.documentUser,
                type: "ONG"
            },
            ong: {
                name: data.nameOng,
                document: data.documentOng,
                about: data.aboutOng,
                city: data.cityOng,
                district: data.districtOng,
                number: data.numberOng,
                state: data.stateOng,
                street: data.streetOng,
                zipcode: data.zipcodeOng,
                complement: data.complementOng,
                telephone: data.telephoneOng
            }
        }

        try {
            if (user?.ongId) {
                await api.put(`/ong/${user.ongId}`, body);
            } else {
                await api.post('/ong', body);
            }

            toast.success(user ? "ONG atualizada com sucesso" : "ONG Criada com sucesso");
            refetchDataGrid();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message);
            } else {
                toast.error("Error interno no servidor");
            }
        } finally {
            handleCloseCreate();
        }
    }

    async function insertLocationToZipCode() {
        setLoadingCep(true);
        try {
            const response = await api.get(`https://viacep.com.br/ws/${watchCEP}/json/`);

            setValue('streetOng', response.data.logradouro);
            setValue('stateOng', response.data.uf);
            setValue('cityOng', response.data.localidade);
            setValue('districtOng', response.data.bairro);
            setValue('complementOng', response.data.complemento)
        } catch (error) {
            console.log(error)
        } finally {
            setLoadingCep(false);
        }
    }

    useEffect(() => {
        if (watchCEP && watchCEP.length === 8 && !user) {
            insertLocationToZipCode();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchCEP]);

    useEffect(() => {
        const fetchOngData = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/ong/${user?.ongId}`);

                setOngData(response.data);

                setValue('nameOng', response.data.name);
                setValue('documentOng', response.data.document);
                setValue('aboutOng', response.data.about);
                setValue('zipcodeOng', response.data.zipcode);
                setValue('stateOng', response.data.state);
                setValue('numberOng', response.data.number);
                setValue('districtOng', response.data.district);
                setValue('streetOng', response.data.street);
                setValue('cityOng', response.data.city);
                setValue('telephoneOng', response.data.telephone);
                setValue('complementOng', response.data.complement);
                setValue('nameUser', response.data.User.name);
                setValue('documentUser', response.data.User.document);
                setValue('emailUser', response.data.User.email);
                setValue('passwordUser', '123456');

            } catch (error) {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Error interno no servidor");
                }
            } finally {
                setLoading(false)
            }
        }

        if (user?.ongId) {
            fetchOngData()
        } else {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.ongId, refreshPage]);

    async function handleRemoveImage() {
        setLoading(true);
        try {
            await api.put(`/ong/removeImage/${user?.ongId}`, {
                imagePath: null
            });

            setIsRefreshPage(prev => !prev);

            toast.success("Imagem removida com sucesso");
            refetchDataGrid();
        } catch (error) {
            toast.error("Error ao remover imagem do usuário");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleCloseCreate}
            maxWidth='md'
            fullWidth
        >
            <DialogTitle>
                {user?.ongId ? "Editar ONG" : "Criar ONG"}
            </DialogTitle>

            <DialogContent>

                {loading ? (
                    <Box
                        sx={{
                            width: '100%',
                            height: '20rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <CircularProgress color="success" />
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
                                    src={`${env.base_url_api}/${ongData?.imagePath}`}
                                />

                                {ongData?.imagePath && (
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
                            <Box component='form' onSubmit={handleSubmit(handleRegisterOng)} >
                                <Grid2 container spacing={2}>
                                    <Grid2 size={12}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            Dados da ONG
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Nome Social (ONG)"
                                            {...register('nameOng')}
                                            error={!!errors.nameOng}
                                            helperText={errors.nameOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <CorporateFare sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Informe seu CNPJ"
                                            {...register('documentOng')}
                                            error={!!errors.documentOng}
                                            helperText={errors.documentOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Badge sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Descrição da ONG"
                                            {...register('aboutOng')}
                                            error={!!errors.aboutOng}
                                            helperText={errors.aboutOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <ThreeP sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            Localização
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="CEP da ONG"
                                            {...register('zipcodeOng')}
                                            error={!!errors.zipcodeOng}
                                            helperText={errors.zipcodeOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <FmdGood sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <>
                                                            {loadingCep && (<CircularProgress size={28} color="success" />)}
                                                        </>
                                                    )
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Cidade da ONG"
                                            {...register('cityOng')}
                                            error={!!errors.cityOng}
                                            helperText={errors.cityOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <LocationCity sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Bairro da ONG"
                                            {...register('districtOng')}
                                            error={!!errors.districtOng}
                                            helperText={errors.districtOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <EmojiTransportation sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>

                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Estado da ONG"
                                            {...register('stateOng')}
                                            error={!!errors.stateOng}
                                            helperText={errors.stateOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Flag sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Rua da ONG"
                                            {...register('streetOng')}
                                            error={!!errors.streetOng}
                                            helperText={errors.streetOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AddRoad sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Numero da ONG"
                                            {...register('numberOng')}
                                            error={!!errors.numberOng}
                                            helperText={errors.numberOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <HomeWork sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Complemnto da ONG"
                                            {...register('complementOng')}
                                            error={!!errors.complementOng}
                                            helperText={errors.complementOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <HolidayVillageOutlined sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            Informações de Acesso
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size={12}>
                                        <TextField
                                            fullWidth
                                            label="Nome do Usuário"
                                            {...register('nameUser')}
                                            error={!!errors.nameUser}
                                            helperText={errors.nameUser?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Person sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Documento Usuário"
                                            {...register('documentUser')}
                                            error={!!errors.documentUser}
                                            helperText={errors.documentUser?.message}
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
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Telefone de Contato"
                                            {...register('telephoneOng')}
                                            error={!!errors.telephoneOng}
                                            helperText={errors.telephoneOng?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Call sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Email do Usuário"
                                            {...register('emailUser')}
                                            error={!!errors.emailUser}
                                            helperText={errors.emailUser?.message}
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
                                        />
                                    </Grid2>
                                    <Grid2 size={6}>
                                        <TextField
                                            fullWidth
                                            label="Senha do Usuário"
                                            type={!!user?.ongId ? 'password' : 'text'}
                                            disabled={!!user}
                                            {...register('passwordUser')}
                                            error={!!errors.passwordUser}
                                            helperText={errors.passwordUser?.message}
                                            slotProps={{
                                                input: {
                                                    startAdornment: (
                                                        <InputAdornment position="start" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <Password sx={{ color: 'green' }} />
                                                            <Divider flexItem orientation="vertical" />
                                                        </InputAdornment>
                                                    ),
                                                },
                                            }}
                                        />
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
                                                {isSubmitting ? <CircularProgress color="success" size={24} /> : user?.ongId ? "EDITAR ONG" : "CRIAR ONG"}
                                            </Button>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </Box>
                        </Grid2>
                    </Grid2>
                )}
            </DialogContent>
        </Dialog>
    )
}