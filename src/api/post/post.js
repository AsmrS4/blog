export const getPosts = async(params)=> {
    const queryParams = `page=${params.current}&size=${params.size}`
    try {
        const response = await fetch('https://blog.kreosoft.space/api/post?'+queryParams, {
            method: 'GET',
            headers: {
                'Accept':'application/json'
            }
        } );
        return response;
    } catch (error) {
        console.error(error);
    }
}