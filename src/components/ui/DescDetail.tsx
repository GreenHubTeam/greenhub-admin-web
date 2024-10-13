import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface IDescDetailProps {
    label: string;
    icon?: ReactNode;
    data: string | ReactNode;
}

export function DescDetail({
    label,
    icon,
    data
}: IDescDetailProps) {
    return (
        <Box
            mb={2}
        >
            <Typography
                sx={{
                    color: '#a5a5a5',
                    fontWeight: 500,
                    mb: '.5rem'
                }}
            >
                {label}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}
            >
                {icon && icon}
                {data}
            </Box>
        </Box>
    )
}