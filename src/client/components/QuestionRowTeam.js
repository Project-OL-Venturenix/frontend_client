import React, {useContext, useEffect, useState} from 'react';
import Editor from './Editor';
import {Checkbox} from 'react-bootstrap';
import TopNavBarTeam from './TopNavBarTeam';
import {TeamContext} from "./App";
import QuestionAreaTeam from "./QuestionAreaTeam";
import {getEventQuestions} from "../api/EventQuestionApi";
import {getQuestions} from "../api/QuestionApi";

function QuestionRowTeam() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventQuestionList, setEventQuestionList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');

    const team = useContext(TeamContext);

    const teamColors = {};
    const colorArray = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

    team.forEach((member, index) => {
        teamColors[member.name] = colorArray[index % colorArray.length];
    });

    const [focusedIndex, setFocusedIndex] = useState(null);


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