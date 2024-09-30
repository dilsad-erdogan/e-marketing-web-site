import axios from 'axios';
const AUTH = "http://localhost:3000/auth";

const register = async ( userData ) => {
    try{
        const response = await axios.post(`${AUTH}/register`, userData);
        return response.data;
    } catch(error) {
        console.error('Register error:', error);
        throw error.response.data;
    }
};

const login = async ( userData ) => {
    try{
        const response = await axios.post(`${AUTH}/loginOrigin`, userData);
        return response.data;
    } catch (error){
        console.error('Login error:', error);
        throw error.response.data;
    }
};

const login2FA = async ( userData ) => {
    try{
        const response = await axios.post(`${AUTH}/login2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA login error:', error);
        throw error.response.data;
    }
};

const verify2FA = async ( userData ) => {
    try{
        const response = await axios.post(`${AUTH}/verify2FA`, userData);
        return response.data;
    } catch (error){
        console.error('2FA verify error:', error);
        throw error.response.data;
    }
};

const forgot = async ( userData ) => {
    try{
        const response = await axios.post(`${AUTH}/forgot`, userData);
        return response.data;
    } catch (error){
        console.error('Forgot password error:', error);
        throw error.response.data;
    }
};

const authService = {
    register,
    login,
    login2FA,
    verify2FA,
    forgot
};

export default authService;