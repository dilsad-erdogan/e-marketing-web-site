import axios from 'axios';
const ORDER = "http://localhost:3000/order";

const get = async ( id ) => {
    try{
        const response = await axios.get(`${ORDER}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching order:', error);
        throw error;
    }
};

const add = async ( orderData ) => {
    try{
        const response = await axios.post(`${ORDER}/add`, orderData);
        return response.data;
    } catch (error){
        console.error('Error adding order:', error);
        throw error;
    }
};

const deleted = async ( id ) => {
    try{
        const response = await axios.patch(`${ORDER}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting order:', error);
        throw error;
    }
};

const byId = async ( id ) => {
    try{
        const response = await axios.get(`${ORDER}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching order by id:', error);
        throw error;
    }
};

const orderServices = {
    get,
    add,
    deleted,
    byId
};

export default orderServices;