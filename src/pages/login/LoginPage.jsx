import React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router';

import { useInput } from '../../hooks/useInput';
import './index.scss';
import { loginUser } from '../../api/user/user';
import { ErrorToast } from '../../utils/notifications';
import { ToastContainer } from 'react-toastify';

const LoginPage = () => {
    const email = useInput('', { isEmailValid: true });
    const password = useInput('', { minLength: 6 });
    const [isFormError, setIsError] = useState(true);
    useEffect(() => {
        if (email.emailError || password.minLengthError) {
            setIsError(true);
        } else {
            setIsError(false);
        }
    }, [email.emailError, password.minLengthError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await loginUser({ email: email.value, password: password.value });

        if (result.ok) {
            let token = await result.json();
            localStorage.setItem('token', token);
            console.log(token);
        } else {
            ErrorToast('Неверный логин или пароль');
        }
    };

    return (
        <>
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
