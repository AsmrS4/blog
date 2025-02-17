import React from 'react';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const UnAuth = () => {
    return (
        <>
            <div className='error-content-wrapper'>
                <SentimentVeryDissatisfiedIcon
                    sx={{ color: '#9caab6', height: '140px', width: '140px', marginBottom: '24px' }}
                />
                <span className='error'>{'Не удалось получить данные('}</span>
            </div>
        </>
    );
};

export default UnAuth;
