import axios from 'axios';
const ROLE = "http://localhost:3000/role";

const add = async ( role ) => {
    try{
        const response = await axios.post(`${ROLE}/add`, role);
        return response.data;
    } catch(error) {
        console.error('Error adding role:', error);
        throw error;
    }
};

const roleServices = {
    add
};

export default roleServices;