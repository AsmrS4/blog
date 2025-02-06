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


export const getQueryString = (params, currentPage) => {
    let query = '';
    if(params.tags && params.tags.length > 0) {
        for(let tag in params.tags) {
            query+=`tags=${tag}&`;
        }
    }
    if(params.author) {
        query+=`author=${params.author}&`;
    }
    if(params.min && params.min >= 0) {
        query+=`min=${params.min}&`;
    }
    if(params.max && params.max >=0) {
        query+=`max=${params.max}&`;
    }
    if(params.sorting) {
        query+=`sorting=${params.sorting}&`
    }
    query+=(currentPage)?`page=${currentPage}&`:`page=1&`
    query+=(params.size)?`size=${params.size}`:`size=5`;
    return query;
}

export const transformDateJson = (date) => {
    return date.split('.').reverse().join('-')
}