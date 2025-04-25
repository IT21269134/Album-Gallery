/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface Props {
    onClose: () => void;
    albums: string[];
    onUpload: (data: { title: string; album: string; file: File }) => void;
    selectedAlbum?: string | null;
}
interface FormData {
    title: string;
    album: string;
}


export default function UploadPhoto({ onClose, albums, onUpload, selectedAlbum }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [file, setFile] = useState<File | null>(null);
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length) setFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        if (file) {
            onUpload({ title: data.title, album: data.album, file });
            onClose();
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Upload Photo</Typography>

            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed grey',
                    borderRadius: 2,
                    p: 3,
                    mb: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? 'action.hover' : 'transparent'
                }}
            >
                <input {...getInputProps()} />
                {file ? <Typography>{file.name}</Typography> : 'Drag and drop an image here, or click to select a file'}
            </Box>

            <TextField fullWidth label="Title" {...register('title')} margin="normal" />

            <FormControl fullWidth margin="normal">
                <InputLabel>Album</InputLabel>
                <Select
                    defaultValue={selectedAlbum || ""}
                    {...register('album', { required: 'Album is required' })}
                >

                    {albums.map((album, idx) => (
                        <MenuItem key={idx} value={album}>{album}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button type="button" onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" type="submit" disabled={!file}>Upload</Button>
            </Box>
        </Box>
    );
}
