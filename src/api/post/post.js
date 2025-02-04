export const fetchPosts = async()=> {
    const queryParams = 'page=1&size=10'
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