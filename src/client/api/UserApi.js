import axios from "axios";

export const signInUser = async (username, password) => {
    try {
        return await axios.post(
            `http://localhost:8080/api/auth/signin`,
            {username, password}
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
};