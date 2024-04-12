import axios from "axios";

export const createUserScores = async (accessToken, userScoreData)=> {
    try {
        const response = await axios.post(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/userscores/addScore`,
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

export const putUserScores = async (accessToken, id, userScoreData)=> {
    try {
        const response = await axios.put(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/userscores/${id}`,
            userScoreData,
            { headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUserScores = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/userscores`,
            { headers: {Authorization: `Bearer ${accessToken}`}}
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
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/usertestcases/eventid/${id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addUserScores = async (accessToken, userScoreData, userQuestionData)=> {
    try {
        const response = await axios.post(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/userscores/addScore`,
            userQuestionData,
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

export const updateUserScores = async (accessToken, userScoreData, userQuestionData)=> {
    try {
        const response = await axios.put(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/userscores/updateScore`,
            userQuestionData,
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


