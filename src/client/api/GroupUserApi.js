import axios from "axios";

export const getGroupUsers = async (accessToken, eventId) => {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/groups/${eventId}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};
