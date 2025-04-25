import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Paper } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SliderViewProps {
    selectedAlbum: string | null;
    albumImages: Record<string, { title: string; file: File }[]>;
}

const SliderView: React.FC<SliderViewProps> = ({ selectedAlbum, albumImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const albumKeys = Object.keys(albumImages);
    const images = selectedAlbum ? albumImages[selectedAlbum] || [] : [];

    // ✅ Always called
    useEffect(() => {
        setCurrentIndex(0); // reset index when album changes
    }, [selectedAlbum]);

    // 🟡 No albums created
    if (albumKeys.length === 0) {
        return (
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>WELCOME TO CHAMZ GALLERY</Typography>
                <Typography variant="subtitle1">Create an album to upload images</Typography>
            </Box>
        );
    }

    // 🟡 No album selected
    if (!selectedAlbum) {
        return (
            <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>WELCOME TO CHAMZ GALLERY</Typography>
                <Typography variant="subtitle1">Select an album to view</Typography>
            </Box>
        );
    }

    // 🟡 Selected album has no images
    if (images.length === 0) {
        return <Typography sx={{ mt: 5 }} align="center">No images to show.</Typography>;
    }

    // 🟢 Show slider
    const currentImage = images[currentIndex];

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Paper elevation={3} sx={{ p: 2, position: 'relative', maxWidth: 600, mx: 'auto' }}>
                <img
                    src={URL.createObjectURL(currentImage.file)}
                    alt={currentImage.title}
                    style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {currentImage.title}
                </Typography>
                <IconButton
                    onClick={handlePrev}
                    sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton
                    onClick={handleNext}
                    sx={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Paper>
        </Box>
    );
};

export default SliderView;
