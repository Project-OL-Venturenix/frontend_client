import axios from "axios";

export const putUserScores = async (accessToken, userScoreData)=> {
    try {
        const response = await axios.post(
            `http://localhost:8081/api/userscores/addScore`,
            null,
            {
            params:userScoreData,
            headers: {Authorization: `Bearer ${accessToken}`}
            }

        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserScoresByEventId = async (accessToken, id)=> {
    try {
        const response = await axios.get(
            `http://localhost:8081/api/usertestcases/eventid/${id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
