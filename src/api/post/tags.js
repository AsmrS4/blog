export const fetchTags = async() => {
    try {
        const response = await fetch('https://blog.kreosoft.space/api/tag', {
            method: 'GET',
            headers: {
                'Accept':'text/plain',
            }
        } );
        return response;
    } catch (error) {
        console.error(error);
    }
}