import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Box, Card, CardContent, Grid2, IconButton, Typography, } from '@mui/material';
import { env } from '@/env/env';
import { Delete } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { api } from '@/libs/axios';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

interface ICardPostProps {
    description: string;
    ongName: string;
    profilePath: string | null;
    createdAt: Date;
    postImagePath: string | null;
    profilePagePathImage?: string;
    postId: string;
    fetchPosts: () => void;
}

export function CardPost({ description, ongName, profilePath, createdAt, postImagePath, profilePagePathImage, postId, fetchPosts }: ICardPostProps) {
    const [postSrc, setPostSrc] = useState(postImagePath ? `${env.base_url_api}/${postImagePath}` : "/nomelogo.png");

    const getRandomProfileImage = () => {
        if (profilePagePathImage) {
            return profilePagePathImage
        }

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

    const [isLoading, setIsLoading] = useState(false);

    const handleDeletePost = async () => {
        setIsLoading(true)
        try {
            await api.delete(`/post/${postId}`);

            toast.success("Post deletado com sucesso");

            fetchPosts();
        } catch (error) {
            toast.error("Error ao deletar post");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '1.5rem',
                        flexDirection: 'column',
                    }}
                >
                    <Grid2 container alignItems='center' justifyContent='space-between'>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2rem'
                            }}
                        >
                            <CustomAvatar imagePath={profilePath || ""} name={ongName} />

                            <Typography variant='h6'>
                                {ongName}
                            </Typography>

                            <Typography variant="body2">
                                Publicado {dayjs(createdAt).fromNow()}
                            </Typography>
                        </Box>

                        <IconButton
                            disabled={isLoading}
                            color='error'
                            onClick={() => handleDeletePost()}
                        >
                            <Delete />
                        </IconButton>
                    </Grid2>


                    <Typography>
                        {description}
                    </Typography>
                    {postImagePath && (
                        <Box
                            component='img'
                            src={postSrc}
                            onError={() => {
                                setPostSrc("/nomelogo.png");
                            }}
                            alt="Imagem do post"
                            sx={{}}
                        />
                    )}

                </Box>
            </CardContent>
        </Card>
    )
}