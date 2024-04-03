import axios from "axios";

export const getQuestions = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/questions`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getQuestionsList = async (accessToken, eventId)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/questions/event/${eventId}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getQuestionById = async (accessToken,Id)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/questions/${Id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
