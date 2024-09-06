import axios from 'axios';
const ServiceUrl ='http://localhost:3000/users';

//register user:
export const registerUser = async (userData)=>{
    try{
        console.log(`${ServiceUrl}/register`);
        
        const response = await axios.post(`${ServiceUrl}/register`,userData);
        return response.data;
    }catch(error){
        console.error(`Error registration user`,error);
        throw error.response ? error.response.data : 'Network Error';
    }
};

//login user:
export const loginUser = async (loginData)=>{
    try{
        const response = await axios.post(`${ServiceUrl}/login`,loginData);
        return response.data;
    }catch(error){
        console.error(`Error Loggin in`,error);
        const errorMessage = error.response && error.response.data.massage  ? error.response.data.massage : 'Network Error'
        throw new Error(errorMessage);
    }
};

// get Pets User:
export const getPetsUser = async(userId) =>{
    try{
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.get(`${ServiceUrl}/pets/${userId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    }catch(error){
        console.error(`Error fetch pets user`, error);
        throw error.response ? error.response.data : 'Network Error';
    }
};

//reset password:
export const resetPassword = async (email)=>{
    try{
        const response = await axios.post(`${ServiceUrl}/reset-password`,{email});
        return response.data;
    }catch(error){
        console.error(`Error requeat reset password`,error);
        const errorMessage = error.response && error.response.data.massage  ? error.response.data.massage : 'Network Error'
        throw new Error(errorMessage);
    }
};

//get User By petId:
export const GetUserByPetId = async (petId)=>{
    try{
        const response = await axios.get(`${ServiceUrl}/get_user${petId}`);
        return response.data;
    }catch(error){
        console.error(`Error get user by pet id`,error);
        const errorMessage = error.response && error.response.data.massage  ? error.response.data.massage : 'Network Error'
        throw new Error(errorMessage);
    }
};

//get All users:
export const GetAllUsers = async ()=>{
    try{
        const response = await axios.get(`${ServiceUrl}/all_users`);
        return response.data;
    }catch(error){
        console.error(`Error get all users`, error);
        throw error.response ? error.response.data : 'Network Error';
    }
};

