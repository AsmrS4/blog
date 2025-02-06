export const getPosts = async(query)=> {
    try {
        const response = await fetch('https://blog.kreosoft.space/api/post?'+query, {
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