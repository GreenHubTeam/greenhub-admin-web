import { LogoComponent } from "@/components/ui/LogoComponent";
import { Box, CircularProgress } from "@mui/material";

export default function Loagding() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
            height: '100vh'
        }}>
            <LogoComponent />
            <CircularProgress color="success" />
        </Box>
    )
}