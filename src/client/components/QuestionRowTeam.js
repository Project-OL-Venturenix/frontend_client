import React, {useContext, useEffect, useState} from 'react';
import Editor from './Editor';
import {Checkbox} from 'react-bootstrap';
import TopNavBarTeam from './TopNavBarTeam';
import {TeamContext} from "./App";
import QuestionAreaTeam from "./QuestionAreaTeam";
import {getEventQuestions} from "../api/EventQuestionApi";
import {getQuestions} from "../api/QuestionApi";
import {getEventGroups} from "../api/EventGroupApi";
import {getGroupUsers} from "../api/GroupUserApi";
import {getUserById} from "../api/UserApi";

function QuestionRowTeam() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventQuestionList, setEventQuestionList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');

    const [team, setTeam] = useState([])

    const teamColors = {};
    const colorArray = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

    team.forEach((member, index) => {
        teamColors[member.firstname] = colorArray[index % colorArray.length];
    });

    const [focusedIndex, setFocusedIndex] = useState(null);

    const getEventGroupUserList = async () => {
        try {
            const response = await getEventGroups(loginUser.accessToken);
            const eventGroups = response.data;
            console.log(eventGroups);

            const selectedEventGroups = eventGroups.filter(group => group.eventid === parseInt(selectedEventId, 10));
            console.log("Selected Event ID:", parseInt(selectedEventId, 10));
            console.log("Filtered groups:", selectedEventGroups);

            const groupUserData = await getGroupUsers(loginUser.accessToken);
            const groupUsers = groupUserData.data;
            console.log("groupUsers:", groupUsers);

            // Find the group IDs where loginUser is a member
            const userGroupIds = groupUsers
                .filter(user => user.userid === loginUser.id)
                .map(user => user.groupid);
            console.log("userGroupIds:", userGroupIds);

            // Filter selectedEventGroups based on the user's group membership
            const userEventGroups = selectedEventGroups.filter(group => userGroupIds.includes(group.groupid));
            console.log("userEventGroups:", userEventGroups);


            // Get all users in the userEventGroups
            const userEventGroupUsers = groupUsers
                .filter(user => userEventGroups.some(group => group.groupid === user.groupid))
                .map(user => ({
                    userid: user.userid,
                }));

            console.log("Users in user's groups:", userEventGroupUsers);

            const updatedTeam = [];
            for (const user of userEventGroupUsers) {
                try {
                    const userDetails = await getUserById(loginUser.accessToken, user.userid);
                    const userToAdd = userDetails.data;
                    //       // Assuming 'team' is a state variable, you need to use setTeam to update it
                    updatedTeam.push(userToAdd);
                    console.log(updatedTeam)
                } catch (error) {
                    console.error('Failed to get user details:', error);
                }
            }
            setTeam(updatedTeam);
            console.log(team);

        } catch (error) {
            console.error('Failed to get event group users:', error);
        }
    };

    const getEventQuestionList = async () => {
        try {
            const response = await getEventQuestions(loginUser.accessToken);
            const eventQuestions = response.data;
            const selectedEventQuestions = eventQuestions.filter(question => question.eventid === parseInt(selectedEventId, 10));
            console.log(selectedEventQuestions)
            const questionIds = selectedEventQuestions.map((question) => question.questionid);
            const questionData = await getQuestions(loginUser.accessToken);
            const questionList = questionData.data;
            console.log("questionList:", questionList);
            console.log("questionIds:", questionIds);
            const filteredQuestions = questionList.filter((question) => questionIds.includes(question.id));
            console.log("filteredQuestions:", filteredQuestions);
            setEventQuestionList(filteredQuestions);
        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    useEffect(() => {
        if (loginUser) {
            getEventGroupUserList();
            getEventQuestionList();
        }
    }, []);


    const handleColorChange = (index) => {
        setFocusedIndex(index);
    };

    return (
        <>
            <TopNavBarTeam/>
            {Array.isArray(eventQuestionList) && eventQuestionList.map((question, index) => (
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '100px',
                        marginLeft: '20px',
                    }}>

                    <div
                        style={{
                            marginLeft: '20px'
                        }}>
                        <QuestionAreaTeam question={question}
                                          borderColor={focusedIndex === index ? teamColors[loginUser.firstname] : 'transparent'}/>
                    </div>
                    <div>
                        <Editor
                            checked={focusedIndex === index}
                            handleColorChange={() => handleColorChange(index)}
                        />
                    </div>

                </div>


            ))}
        </>
    );
}

export default QuestionRowTeam;