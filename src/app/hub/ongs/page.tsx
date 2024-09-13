import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

export default function Page() {
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Typography variant="h4" fontWeight={700}>
                    Lista de ONGS
                </Typography>

                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        boxShadow: 'none'
                    }}
                    startIcon={<AddIcon />}
                >
                    Criar ONG
                </Button>
            </Box>

            <Box
                sx={{
                    marginTop: '2rem',
                }}
            >
                <TextField
                    fullWidth
                    label="Procure pelo Nome"
                    sx={{
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
                            color: 'black',               // Define a cor do label
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'green',              // Cor do label quando focado
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </Box>
        </Box>
    )
}