export const getPosts = async(query)=> {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch('https://blog.kreosoft.space/api/post?'+query, {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + token
            }
        } );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const createPost = async(data) => {
    let token = localStorage.getItem('token');
    try {
        const resposne = await fetch('https://blog.kreosoft.space/api/post', {
            method: 'POST',
            headers: {
                'Accept':'text/plain',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }, 
            body: JSON.stringify({
                ...data
            })
        } );
        return resposne
    } catch (error) {
        console.error(error);
    }
}

export const addLike = async(postId) => {
    let token = localStorage.getItem('token');
    try {
        const resposne = await fetch(`https://blog.kreosoft.space/api/post/${postId}/like`, {
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
        const resposne = await fetch(`https://blog.kreosoft.space/api/post/${postId}/like`, {
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