import axios from 'axios';
const BASKET = "http://localhost:3000/basket";

const get = async ( id ) => {
    try{
        const response = await axios.get(`${BASKET}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching basket:', error);
        throw error;
    }
};

const add = async ( basketData ) => {
    try{
        const response = await axios.post(`${BASKET}/add`, basketData);
        return response.data;
    } catch (error){
        console.error('Error adding basket:', error);
        throw error;
    }
};

const updateAmount = async ( id, amount ) => {
    try{
        const response = await axios.put(`${BASKET}/updateAmount/${id}`, amount);
        return response.data;
    } catch (error){
        console.error('Error updating basket:', error);
        throw error;
    }
};

const deleted = async ( id ) => {
    try{
        const response = await axios.patch(`${BASKET}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting basket:', error);
        throw error;
    }
};

const byId = async ( id ) => {
    try{
        const response = await axios.get(`${BASKET}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching basket by id:', error);
        throw error;
    }
};

const basketServices = {
    get,
    add,
    updateAmount,
    deleted,
    byId
};

export default basketServices;