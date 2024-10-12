import { env } from '@/env/env';
import { useRouter } from 'next/navigation';
import { Box, Typography, Chip, CardContent, Card, CardMedia, Paper, CardActionArea, Avatar, } from '@mui/material';

interface ICardProjectProps {
    id: string;
    name: string;
    description: string;
    status: "APPROVED" | "REPROVED" | "WAITING";
    imagePath: string | null;
    ongId: string;
    ongName: string;
    ongImagePath: string | null;
}

export function CardProject(data: ICardProjectProps) {
    const navigate = useRouter();

    const getStatusChip = (status: "APPROVED" | "REPROVED" | "WAITING") => {
        switch (status) {
            case 'APPROVED':
                return <Chip label='Aprovado' variant='filled' color='success' />;
            case 'REPROVED':
                return <Chip label='Rejeitado' variant='filled' color='error' />;
            case 'WAITING':
                return <Chip label='Pendente' variant='filled' color='warning' />;
            default:
                return <Chip label='Status desconhecido' variant='filled' color='default' />;
        }
    };

    return (
        <Paper variant='outlined'>
            <Card elevation={0}>
                <CardActionArea onClick={() => navigate.push(`/hub/projects/${data.id}`)}>
                    <CardMedia
                        sx={{ height: 200 }}
                        image={data.imagePath ? `${env.base_url_api}/${data.imagePath}` : "/banner.jpg"}
                        title='Project Image'
                    />

                    <CardContent>
                        <Box
                            sx={{ display: 'flex', justifyContent: 'space-between', gap: '.5re,' }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '700',
                                    fontSize: '1.35rem',
                                    marginBottom: '.4rem',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {data.name}
                            </Typography>

                            {getStatusChip(data.status)}
                        </Box>

                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {data.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActionArea onClick={() => navigate.push(`/hub/ong/${data.id}`)}>
                    <CardContent
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            gap: '1rem'
                        }}
                    >
                        <Avatar
                            src={`${env.base_url_api}/${data.ongImagePath}`}
                            alt={data.ongName}
                        />

                        <Typography
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {data.ongName}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Paper >
    )
}