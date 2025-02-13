import React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import './index.scss';
import Loader from '../../components/loader/Loader';
import Header from '../../components/header/Header';

import { editUserProfile, fetchUserProfile } from '../../api/user/user';

import { useInput } from '../../hooks/useInput';
import { ErrorToast, SuccessToast, WarningToast } from '../../utils/notifications';
import { ERROR_400, ERROR_401, ERROR_500 } from '../../utils/statusCodes';
import { transformDate, transformDateJson } from '../../utils/converter';
import { delay } from '../../utils/delay';

const ProfilePage = () => {
    const [userProfile, setUserProfile] = useState({
        fullName: '',
        birthDate: '',
        email: '',
        phoneNumber: '',
        createTime: '',
    });
    const [isFormError, setIsError] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const email = useInput('', { isEmailValid: true });
    const fullName = useInput('', { isEmpty: true });
    const phone = useInput('', { isPhoneValid: true, isEmpty: true });
    const [dateValue, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await editUserProfile({
            fullName: fullName.value,
            birthDate: dateValue,
            gender: 'Male',
            email: email.value,
            phoneNumber: phone.value,
        });

        if (result.ok) {
            SuccessToast('Данные сохранены');
        } else {
            if (result.status === 401) {
                WarningToast(ERROR_401);
            } else if (result.status === 400) {
                ErrorToast(ERROR_400);
            } else {
                ErrorToast(ERROR_500);
            }
        }
    };

    const handleDate = (e) => {
        let date = new Date(e).toLocaleDateString(e);
        date = transformDateJson(date);
        setDate(date);
    };

    const getUserProfile = async () => {
        setIsLoading(true);
        await delay(500);
        const result = await fetchUserProfile();
        if (result.ok) {
            let data = await result.json();
            setUserProfile((prev) => ({ ...prev, ...data }));
        } else {
            result.status === 401 ? WarningToast(ERROR_401) : ErrorToast(ERROR_500);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        fullName.setValue(userProfile.fullName);
        email.setValue(userProfile.email);
        phone.setValue(userProfile.phoneNumber);
        setDate(transformDateJson(userProfile.birthDate));
    }, [isLoading]);

    useEffect(() => {
        setIsError(email.emailError || phone.phoneError || fullName.isEmpty);
    }, [email.emailError, phone.phoneError, fullName.isEmpty]);

    return (
        <>
            <Header />
            <section className='content'>
                <div className='container'>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <form className='profile-form' onSubmit={handleSubmit}>
                            <div className='title-wrapper'>
                                <h1 className='profile-form__title'>
                                    <span>{userProfile.fullName}</span>
                                </h1>
                                <span>
                                    {'Аккаунт создан: '}
                                    {transformDate(userProfile.createTime)}
                                </span>
                            </div>
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
                            </div>
                            <Button
                                variant='contained'
                                sx={{ width: '90%', marginBottom: '20px' }}
                                type={'sumbit'}
                                disabled={isFormError}
                            >
                                {'Сохранить'}
                            </Button>
                        </form>
                    )}
                    <ToastContainer />
                </div>
            </section>
        </>
    );
};

export default ProfilePage;
