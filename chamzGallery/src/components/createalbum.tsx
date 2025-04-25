import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';

interface Props {
    onClose: () => void;
    onCreate: (title: string) => void;
}

interface FormData {
    title: string;
    description?: string;
}

export default function CreateAlbum({ onClose, onCreate }: Props) {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit: SubmitHandler<FormData> = (data) => {
        onCreate(data.title);
        onClose();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Create Album</Typography>
            <TextField
                fullWidth
                label="Title"
                {...register('title', { required: 'Title is required' })}
                error={!!errors.title}
                helperText={errors.title?.message as string}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Description"
                {...register('description', { required: 'Description is required' })}
                error={!!errors.description}
                helperText={errors.description?.message as string}
                margin="normal"
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
                <Button type="button" onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
                <Button variant="contained" type="submit">Create</Button>
            </Box>
        </Box>
    );
}
