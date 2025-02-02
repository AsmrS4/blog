import React, { useEffect, useState } from 'react';
import { Button, Link, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useInput } from '../../hooks/useInput';
import './index.scss';
import { dateIsValid, transformDate, transformDateJson } from '../../utils/converter';
import { registerUser } from '../../api/user/user';

const RegisterPage = () => {
    const email = useInput('', { isEmailValid: true, isEmpty: true });
    const password = useInput('', { minLength: 6, isEmpty: true });
    const fullName = useInput('', { isEmpty: true });
    const phone = useInput('', { isPhoneValid: true, isEmpty: true });
    const [isFormError, setIsError] = useState(true);
    const [dateValue, setDate] = useState('');

    useEffect(() => {
        if (email.emailError || password.minLengthError || phone.phoneError || fullName.isEmpty) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [email.emailError, password.minLengthError, phone.phoneError, fullName.isEmpty]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await registerUser({
            fullName: fullName.value,
            password: password.value,
            email: email.value,
            gender: 'Male',
            birthDate: dateValue,
            phoneNumber: phone.value,
        });
        if (result.ok) {
            let token = await result.json();
            localStorage.setItem('token', token);
            console.log(token);
        } else {
            console.log('error');
        }
    };

    const handleDate = (e) => {
        let date = new Date(e).toLocaleDateString(e);
        date = transformDateJson(date);
        setDate(date);
    };

    return (
        <>
            <section className='content'>
                <div className='container'>
                    <form className='register-form' onSubmit={handleSubmit}>
                        <h1 className='register-form__title'>
                            <span>{'Регистрация'}</span>
                        </h1>
                        <div className='inputs-wrapper'>
                            <TextField
                                label='ФИО'
                                id='fullName'
                                value={fullName.value}
                                onChange={(e) => fullName.onChange(e)}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'Введите свое имя'}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ width: '90%', marginBottom: '24px' }}
                                    label='Дата рождения'
                                    value={dateValue ? dayjs(dateValue) : null}
                                    onChange={(e) => handleDate(e)}
                                    dateFormat={'dd/MM/YYYY'}
                                />
                            </LocalizationProvider>
                            <TextField
                                label='Телефон'
                                value={phone.value}
                                onChange={(e) => phone.onChange(e)}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                placeholder={'+7 (XXX) XXX XX-XX'}
                                error={phone.phoneError}
                            />
                            <TextField
                                label='Email'
                                value={email.value}
                                onChange={(e) => email.onChange(e)}
                                type={'email'}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                error={email.emailError}
                            />
                            <TextField
                                label='Пароль'
                                value={password.value}
                                onChange={(e) => password.onChange(e)}
                                type={'password'}
                                sx={{ width: '90%', marginBottom: '24px' }}
                                error={!password.isEmpty && password.minLengthError}
                            />
                            <div className='link'>
                                {'Уже есть аккаунт? '}
                                <Link to={'/login'} sx={{ cursor: 'pointer' }}>
                                    {'Войти'}
                                </Link>
                            </div>
                        </div>

                        <Button
                            variant='contained'
                            sx={{ width: '90%', marginBottom: '20px' }}
                            type={'sumbit'}
                            disabled={isFormError}
                        >
                            {'Отправить'}
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
