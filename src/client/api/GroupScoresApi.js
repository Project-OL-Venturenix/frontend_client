import axios from "axios";

export const putGroupScores = async (accessToken, groupScoreData)=> {
    try {
        const response = await axios.post(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/groupscores`,
            groupScoreData,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        )
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGroupScoresByEventId = async (accessToken, id)=> {
    try {
        const response = await axios.get(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/groups/eventid/${id}`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};