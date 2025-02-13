import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import { Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, AdapterDayjs } from '@mui/x-date-pickers';
import { ToastContainer } from 'react-toastify';

import './index.scss';
import Header from '../../components/header/Header';

import { registerUser } from '../../api/user/user';

import { useInput } from '../../hooks/useInput';
import { ErrorToast, SuccessToast } from '../../utils/notifications';
import { transformDateJson } from '../../utils/converter';
import { delay } from '../../utils/delay';

const RegisterPage = () => {
    const email = useInput('', { isEmailValid: true, isEmpty: true });
    const password = useInput('', { minLength: 6, isEmpty: true });
    const fullName = useInput('', { isEmpty: true });
    const phone = useInput('', { isPhoneValid: true, isEmpty: true });
    const [isFormError, setIsError] = useState(true);
    const [isLoading, setLoading] = useState(false);
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
        setLoading(true);
        await delay(500);
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
            localStorage.setItem('token', token.token);
            SuccessToast('Аккаунт успешно создан');
        } else {
            if (result.status === 400) {
                ErrorToast('Неккоректные данные');
            } else if (result.status >= 500) {
                ErrorToast('Ошибка сервера');
            }
        }
        setLoading(false);
    };

    const handleDate = (e) => {
        let date = new Date(e).toLocaleDateString(e);
        date = transformDateJson(date);
        setDate(date);
    };

    return (
        <>
            <Header />
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
                            loading={isLoading}
                            loadingIndicator={'Отправка...'}
                            disabled={isFormError}
                        >
                            {'Отправить'}
                        </Button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default RegisterPage;
