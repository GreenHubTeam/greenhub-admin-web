import { Box, CircularProgress } from "@mui/material";

export default function LoadingFullPage() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <CircularProgress color="success" />
        </Box>
    )
}