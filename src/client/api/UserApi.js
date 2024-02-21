import axios from "axios";
import {useContext} from 'react';
import {LoginUserContext} from '../components/App';

export const signInUser = async (username, password)=> {

    try {
        const response = await axios.post(
            `http://localhost:8081/api/auth/signin`,
            {username, password}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const signUpUser = async (userData) => {

    try {
        const response = await axios.post(
                `http://localhost:8081/api/auth/signup`,
                {userData},
            )
        ;
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};