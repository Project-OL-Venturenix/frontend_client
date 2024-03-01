import axios from "axios";

export const getEvents = async (accessToken) => {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/events`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};

export const getEventByid = async (accessToken, id) => {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/events/${id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch
        (error) {
        console.error(error);
        throw error;
    }
};