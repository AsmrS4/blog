import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => {
    return (
        <>
            <CircularProgress
                sx={{
                    marginTop: '64px',
                    display: 'flex',
                    alignSelf: 'center',
                    justifySelf: 'center',
                }}
                size={64}
            />
        </>
    );
};

export default Loader;
