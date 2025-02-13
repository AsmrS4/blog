import React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';

import './index.scss';
import Header from '../../components/header/Header';

import { loginUser } from '../../api/user/user';

import { useInput } from '../../hooks/useInput';
import { ErrorToast } from '../../utils/notifications';
import { delay } from '../../utils/delay';

const LoginPage = () => {
    const email = useInput('', { isEmailValid: true });
    const password = useInput('', { minLength: 6 });
    const [isFormError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (email.emailError || password.minLengthError) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [email.emailError, password.minLengthError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await delay(500);
        const result = await loginUser({ email: email.value, password: password.value });

        if (result.ok) {
            let token = await result.json();
            localStorage.setItem('token', token.token);
            navigate('/');
        } else {
            ErrorToast('Неверный логин или пароль');
        }
        setIsLoading(false);
    };

    return (
        <>
            <Header />
            <section className='content'>
                <div className='container'>
                    <form className='login-form' onSubmit={handleSubmit}>
                        <h1 className='login-form__title'>
                            <span>{'Авторизация'}</span>
                        </h1>
                        <div className='inputs-wrapper'>
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
                                {'Нет аккаунта? '}
                                <Link to={'/registration'} sx={{ cursor: 'pointer' }}>
                                    {'Регистрация'}
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
                            {'Войти'}
                        </Button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default LoginPage;
