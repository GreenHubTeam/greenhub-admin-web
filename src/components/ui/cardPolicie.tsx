import { Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function CardPolicie(
    {
        icon,
        title,
        description,
        policy
    }:
        {
            icon: ReactNode,
            title: string,
            description: string,
            policy: "lgpd" | "policies" | 'useterms'
        }
) {
    const router = useRouter();

    return (
        <Grid2 size={{ xs: 12, md: 4 }}>
            <Card variant="outlined" sx={{ height: '100%' }}>
                <CardActionArea sx={{ height: '100%' }} onClick={() => router.push(`/hub/policies/${policy}`)}>
                    <CardContent>
                        {icon}
                        <Typography variant="h5" >
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid2>
    )
}