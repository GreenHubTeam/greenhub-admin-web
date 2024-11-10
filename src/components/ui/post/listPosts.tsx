import { api } from "@/libs/axios";
import { toast } from "react-toastify";
import { CardPost } from "../cardPost";
import { useEffect, useState } from 'react';
import { IPostType } from "@/types/postTypes";
import { Box, Grid2, Container, CircularProgress } from '@mui/material';

export function ListPost({ ongId, profilePath }: { ongId: string, profilePath?: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState<IPostType[] | null>(null);

    async function fetchPost() {
        setIsLoading(true);
        try {
            const response = await api.get(`/post/ong/${ongId}`);
            setPostData(response.data.posts);
        } catch (error) {
            console.log(error)
            toast.error("Error ao buscar os post")
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPost();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ongId]);

    return (
        <Box>
            <Container maxWidth='md'>
                {isLoading && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100px'
                        }}
                    >
                        <CircularProgress color="success" />
                    </Box>
                )}
                {!isLoading && postData && postData.length > 0 && (
                    <Grid2 container spacing={2} sx={{ marginTop: '3rem' }} >
                        {
                            postData.map(
                                (post, index) => (
                                    <Grid2 key={index} size={12}>
                                        <CardPost
                                            description={post.description}
                                            createdAt={post.createdAt}
                                            ongName={post.Ong.name}
                                            postImagePath={post.imagePath}
                                            profilePath={post.Ong.imagePath}
                                            profilePagePathImage={profilePath}
                                            postId={post.id}
                                            fetchPosts={fetchPost}
                                        />
                                    </Grid2>
                                )
                            )
                        }
                    </Grid2>
                )}
            </Container>
        </Box >
    )
}