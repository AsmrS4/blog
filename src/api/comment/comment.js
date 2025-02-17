export const createComment = async(postId, data) => {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/post/${postId}/comment`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                ...data
            })
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}