import { env } from '@/env/env';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getStatusChip } from '@/utils/getStatusChip';
import { Box, Typography, CardContent, Card, CardMedia, Paper, CardActionArea, Avatar, } from '@mui/material';

const stripHtmlTags = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
};
interface ICardProjectProps {
    id: string;
    name: string;
    description: string;
    status: "APPROVED" | "REPROVED" | "WAITING" | "INACTIVE";
    imagePath: string | null;
    ongId: string;
    ongName: string;
    ongImagePath: string | null;
    viewProfile?: boolean;
}

export function CardProject(data: ICardProjectProps) {
    const navigate = useRouter();
    const [srcImage, setSrcImage] = useState(`${env.base_url_api}/${data.imagePath}` || "banner.jpg");

    const getRandomProfileImage = () => {
        const profileImages = [
            "/profile1.png",
            "/profile2.png",
            "/profile3.png",
            "/profile4.png",
            "/profile5.png",
            "/profile6.png"
        ];
        const randomIndex = Math.floor(Math.random() * profileImages.length);
        return profileImages[randomIndex];
    };

    const CustomAvatar = ({ imagePath, name }: { imagePath: string, name: string }) => {
        const [avatarSrc, setAvatarSrc] = useState(`${env.base_url_api}/${imagePath}`);

        return (
            <Avatar
                src={avatarSrc}
                alt={name}
                onError={() => setAvatarSrc(getRandomProfileImage())}
                sx={{ cursor: 'pointer' }}
            />
        );
    };

    return (
        <Paper variant='outlined'>
            <Card elevation={0}>
                <CardActionArea onClick={() => navigate.push(`/hub/projects/${data.id}`)}>
                    <CardMedia
                        component='img'
                        alt='Project Image'
                        sx={{ height: 200 }}
                        image={srcImage}
                        title='Project Image'
                        onError={() => {
                            setSrcImage('/banner.jpg')
                        }}
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
                            noWrap
                        >
                            {stripHtmlTags(data.description)}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                {data.viewProfile && (
                    <CardActionArea onClick={() => navigate.push(`/hub/ongs/${data.ongId}`)}>
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                                gap: '1rem'
                            }}
                        >
                            <CustomAvatar imagePath={data.ongImagePath || ""} name={data.ongName} />

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
                )
                }
            </Card>
        </Paper >
    )
}