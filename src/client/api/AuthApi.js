import axios from "axios";

export const signInUser = async (userName, password)=> {
    try {
        const response = await axios.post(
            `http://localhost:8081/api/auth/signin`,
            {userName, password}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const signUpUser = async (userData) => {
    try {
        console.log(userData)
        const response = await axios.post(
                `http://localhost:8081/api/auth/signup`,
                userData
            );
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};