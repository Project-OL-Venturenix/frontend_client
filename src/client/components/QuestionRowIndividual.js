import React, {useContext, useEffect, useState} from 'react';
import QuestionAreaIndividual from './QuestionAreaIndividual';
import Editor from './Editor';
import TopNavBar from './TopNavBar';
import {getQuestions} from "../api/QuestionApi";
import {getEventQuestions} from "../api/EventQuestionApi";

function QuestionRowIndividual() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventQuestionList, setEventQuestionList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');

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

    return (
        <>
            <TopNavBar/>
            {Array.isArray(eventQuestionList) && eventQuestionList.map((question, index) => (
                <div
                    key={question.id}
                    style={{
                        display: 'flex',
                        marginBottom: '100px',
                        marginLeft: '20px'
                    }}
                >
                    <div
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        <QuestionAreaIndividual question={question}/>
                    </div>
                    <Editor question={question}/>
                </div>
            ))}
        </>
    );
}

export default QuestionRowIndividual;