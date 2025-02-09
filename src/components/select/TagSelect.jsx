import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function TagSelect({ value = [], setValue, tags = [] }) {
    return (
        <Autocomplete
            multiple
            limitTags={2}
            id='multiple-limit-tags'
            options={tags}
            getOptionLabel={(option) => option.name}
            defaultValue={[]}
            renderInput={(params) => (
                <TextField {...params} label='Теги' placeholder='Укажите теги' />
            )}
            sx={{ maxWidth: '700px', width: '100%', marginBottom: '20px', marginX: '5px' }}
        />
    );
}
