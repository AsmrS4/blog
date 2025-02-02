import {toast} from 'react-toastify';

export const SuccessToast = (message) => {
    toast.success(`${message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    });
};

export const ErrorToast = (message) => {
    toast.error(`${message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    });
};

export const WarningToast = (message) => {
    toast.warning(`${message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    });
};

export const InfoToast = (message) => {
    toast.info(`${message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored'
    });
};