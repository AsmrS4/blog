import React from 'react';
import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import './index.scss';

const RegisterPage = () => {
    return (
        <>
            <section className='content'>
                <div className='container'>
                    <form className='register-form'>
                        <h1 className='register-form__title'>{'Регистрация'}</h1>
                        <div className='inputs-wrapper'>
                            <TextField
                                label='ФИО'
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'Введите свое имя'}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ width: '90%', marginBottom: '24px' }}
                                    label='Дата рождения'
                                />
                            </LocalizationProvider>
                            <TextField
                                label='Телефон'
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'+7 (XXX) XXX XX-XX'}
                                helperText={''}
                            />
                            <TextField
                                label='Email'
                                type={'email'}
                                sx={{ width: '90%', marginBottom: '24px' }}
                            />
                            <TextField
                                label='Пароль'
                                type={'password'}
                                sx={{ width: '90%', marginBottom: '24px' }}
                            />
                        </div>
                        <Button variant='contained' sx={{ width: '90%', marginBottom: '20px' }}>
                            {'Отправить'}
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
