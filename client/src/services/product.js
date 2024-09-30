import axios from 'axios';
const PRODUCT = "http://localhost:3000/product";

const get = async () => {
    try{
        const response = await axios.get(`${PRODUCT}/get`);
        return response.data;
    } catch (error){
        console.error('Error fetching product:', error);
        throw error;
    }
};

const add = async ( productData ) => {
    try{
        const response = await axios.post(`${PRODUCT}/add`, productData);
        return response.data;
    } catch (error){
        console.error('Error adding product:', error);
        throw error;
    }
};

const updateName = async ( id, name ) => {
    try{
        const response = await axios.put(`${PRODUCT}/updateName/${id}`, name);
        return response.data;
    } catch (error){
        console.error('Error updating product name:', error);
        throw error;
    }
};

const updatePhoto = async ( id, photo ) => {
    try{
        const response = await axios.put(`${PRODUCT}/updatePhoto/${id}`, photo);
        return response.data;
    } catch (error){
        console.error('Error updating product photo:', error);
        throw error;
    }
};

const updatePrice = async ( id, price ) => {
    try{
        const response = await axios.put(`${PRODUCT}/updatePrice/${id}`, price);
        return response.data;
    } catch (error){
        console.error('Error updating product price:', error);
        throw error;
    }
};

const deleted = async (id) => {
    try{
        const response = await axios.patch(`${PRODUCT}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting product:', error);
        throw error;
    }
};

const byId = async (id) => {
    try{
        const response = await axios.get(`${PRODUCT}/byId/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching product by id:', error);
        throw error;
    }
};

const productServices = {
    get,
    add,
    updateName,
    updatePhoto,
    updatePrice,
    deleted,
    byId
};

export default productServices;