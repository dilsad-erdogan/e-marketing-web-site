import axios from 'axios';
const ORDERINPRODUCT = "http://localhost:3000/orderINproduct";

const get = async ( id ) => {
    try{
        const response = await axios.get(`${ORDERINPRODUCT}/get/${id}`);
        return response.data;
    } catch (error){
        console.error('Error fetching order in product:', error);
        throw error;
    }
};

const add = async ( oipData ) => {
    try{
        const response = await axios.post(`${ORDERINPRODUCT}/add`, oipData);
        return response.data;
    } catch (error){
        console.error('Error adding order in product:', error);
        throw error;
    }
};

const deleted = async ( id ) => {
    try{
        const response = await axios.patch(`${ORDERINPRODUCT}/delete/${id}`);
        return response.data;
    } catch (error){
        console.error('Error deleting order in product:', error);
        throw error;
    }
};

const orderINproductServices = {
    get,
    add,
    deleted
};

export default orderINproductServices;