import { useEffect, useState } from "react";


export const useValidation = (value, validations) => {
    const [isEmpty, setIsEmpty] = useState(true);
    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const isEmailValid = (email) => {
        let regex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        return regex.test(String(email).toLowerCase());
    };

    const isPhoneValid = (phone) => {
        let regex = /^(\+|)(7|8)( |)\d{3}( |)\d{3}( |)(\d{2}( |)){2}$/;
        return regex.test(String(phone).toLowerCase());
    };

    const isDateValid = (date) => {
        
    }

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    String(value).length < validations[validation]
                        ? setMinLengthError(true)
                        : setMinLengthError(false);
                    break;
                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);
                    break;
                case 'isEmailValid':
                    !value || isEmailValid(value) ? setEmailError(false) : setEmailError(true);
                    break;
                case 'isPhoneValid':
                    !value || isPhoneValid(value) ? setPhoneError(false) : setPhoneError(true);
                    break;
            }
        }
    }, [value]);

    return { isEmpty, minLengthError, emailError, phoneError };
};
