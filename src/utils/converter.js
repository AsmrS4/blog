export const sliceDate = (date) => {
    return String(date).slice(0, 10);
}

export const dateIsValid = (date) => {
    return sliceDate(date) <= getToday();
}

const getToday = () => {
    let today = new Date();
    return today.toISOString().slice(0, 10);
}

export const transformDate = (date) => {
    let slicedDate = sliceDate(date);
    return slicedDate.split('-').reverse().join('.');
}

export const transformDateJson = (date) => {
    return date.split('.').reverse().join('-')
}