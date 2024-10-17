import { Box, CircularProgress } from "@mui/material";
import { LogoComponent } from "@/components/ui/LogoComponent";

export default function Loagding() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <LogoComponent />
            <CircularProgress color="success" />
        </Box>
    )
}