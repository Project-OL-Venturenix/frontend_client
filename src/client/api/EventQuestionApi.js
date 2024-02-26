import axios from "axios";

export const getEventQuestions = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/eventquestions`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};