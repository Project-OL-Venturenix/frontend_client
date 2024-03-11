import axios from "axios";

export const putUserQuestionSubmit = async (accessToken, userQuestionData)=> {
    try {
        const response = await axios.post(
            `http://localhost:8081/api/userquestionsubmits`,
            userQuestionData,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserQuestionSubmit = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/userquestionsubmits`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
