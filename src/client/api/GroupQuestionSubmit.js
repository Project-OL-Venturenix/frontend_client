import axios from "axios";

export const putGroupQuestionSubmit = async (accessToken, groupQuestionData)=> {
    try {
        const response = await axios.post(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/groupquestionsubmits`,
            groupQuestionData,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGroupQuestionSubmit = async (accessToken)=> {
    try {
        const response = await axios.get(
            `http://vtxlab-projectol-backend.ap-southeast-1.elasticbeanstalk.com:8080/api/groupquestionsubmits`,
            {headers: {Authorization: `Bearer ${accessToken}`}}
        );
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
