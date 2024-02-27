import axios from "axios";

export const getEventGroups = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/eventgroups`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};