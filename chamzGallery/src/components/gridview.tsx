import {
    Box, Typography, Card, CardMedia, CardContent
} from '@mui/material';
import Grid from '@mui/material/Grid';

interface Props {
    albumImages: Record<string, { title: string; file: File }[]>;
    selectedAlbum: string | null;
}


export default function GridView({ albumImages, selectedAlbum }: Props) {
    if (!selectedAlbum || !albumImages[selectedAlbum]?.length) {
        return <Typography sx={{ mt: 5 }} align="center">No images to show.</Typography>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                {albumImages[selectedAlbum].map((photo, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={URL.createObjectURL(photo.file)}
                                alt={photo.title}
                                sx={{ height: 200, objectFit: 'cover', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                            />

                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="subtitle1" align="center" fontWeight={500}>
                                    {photo.title}
                                </Typography>
                            </CardContent>

                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
