import axios from "axios";

export const getUsers = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/users`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserById = async (accessToken,id)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/users/${id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};