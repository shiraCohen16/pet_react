import axios from 'axios';
const ServiceUrl ='http://localhost:3000/pets';
// Get all pets
export const GetAllPets = async () => {
    try {
        console.log(`${ServiceUrl}/all`);
        const response = await axios.get(`${ServiceUrl}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching pets:', error); // Log the error for debugging
        throw error.response ? error.response.data : 'Network Error';
    }
};

// Get All Categories: 
export const GetAllCategories = async () =>{
    try{
        const response = await axios.get(`${ServiceUrl}/all_c`);
        return response.data;
    }catch(error){
        console.error('Error Fetching Categories',error);
        throw error.response ? error.response.data : 'Network Error';
    }
};
//Get Pets By Category:
export const GetPetsByCategory = async (Category)=>{
    try{
        const response = await axios.get(`${ServiceUrl}/all/${Category}`);
        return response.data;
    }catch(error){
        console.error('Error Fetch pets by category', error);
        throw error.response ? error.response.data : 'Network Error';
    }
};
//Create  new Pet
export const CreatePetfunc = async (petData) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.post(`${ServiceUrl}/create`, petData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating pet:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : 'Network Error';
    }
};
// Delete pet By id
export const DeletePet = async (petId) => {
    try {
        const accessToken = sessionStorage.getItem('accessToken');
        const response = await axios.delete(`${ServiceUrl}/delete/${petId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error Fetch Delete pet', error);
        throw error.response ? error.response.data : 'Network Error';
    }
};

// Get Pet ById
export const GetPetById = async (petId) => {
    try {
        const response = await axios.get(`${ServiceUrl}/${petId}`);
        return response.data;
    } catch (error) {
        console.error('Error Fetch pet by petId', error);
        throw error.response ? error.response.data : 'Network Error';
    }
};