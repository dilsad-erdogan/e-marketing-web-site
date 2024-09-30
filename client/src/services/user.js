import axios from 'axios';
const USER = "http://localhost:3000/user";

const updateName = async( id, name ) => {
    try{
        const response = await axios.put(`${USER}/updateName/${id}`, name);
        return response.data;
    } catch(error) {
        console.error('Error updating name user:', error);
        throw error;
    }
};

const updateEmail = async( id, email ) => {
    try{
        const response = await axios.put(`${USER}/updateEmail/${id}`, email);
        return response.data;
    } catch(error) {
        console.error('Error updating email user:', error);
        throw error;
    }
};

const updatePassword = async( id, password ) => {
    try{
        const response = await axios.put(`${USER}/updatePassword/${id}`, password);
        return response.data;
    } catch(error) {
        console.error('Error updating password user:', error);
        throw error;
    }
};

const deleted = async( id ) => {
    try{
        const response = await axios.patch(`${USER}/delete/${id}`);
        return response.data;
    } catch(error) {
        console.error('Error delete user:', error);
        throw error;
    }
};

const userServices = {
    updateName,
    updateEmail,
    updatePassword,
    deleted
};

export default userServices;