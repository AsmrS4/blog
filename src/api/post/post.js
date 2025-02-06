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

export const addLike = async(postId) => {
    let token = localStorage.getItem('token');
    try {
        const resposne = await fetch(`https://blog.kreosoft.space/api/post${postId}/like`, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return resposne;
    } catch (error) {
        console.error('Failed add like to post: '+error);
    }
}

export const removeLike = async(postId) => {
    let token = localStorage.getItem('token');
    try {
        const resposne = await fetch(`https://blog.kreosoft.space/api/post${postId}/like`, {
            method: 'DELETE',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        return resposne;
    } catch (error) {
        console.error('Failed add like to post: '+error);
    }
}