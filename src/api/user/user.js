export const logoutUser = async() => {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'text/plain',
                'Authorization': 'Bearer ' + token
            },
        })
        return response;
    } catch (error) {
        console.error('Response error: '+ error)  
    }
}

export const loginUser = async(data) => {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                ...data
            })
        })
        return response;
    } catch (error) {
        console.error('Response error: '+ error)
    }
}

export const registerUser = async(data) => {
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/register`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                ...data
            })
        })
        return response;
    } catch (error) {
        console.error('Response error: '+ error);
    }
}


export const fetchUserProfile = async() => {
    let token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/profile`, {
            method:'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        return response;
    } catch (error) {
        console.error('Response error: '+ error)        
    }
}

export const editUserProfile = async(data) => {
    let token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://blog.kreosoft.space/api/account/profile`, {
            method:'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + token
            }, 
            body:JSON.stringify({
                ...data
            })
        })
        return response;
    } catch (error) {
        console.error('Response error: ' + error)
    }
}