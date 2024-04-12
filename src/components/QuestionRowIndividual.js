import React, {useContext, useEffect, useState} from 'react';
import QuestionAreaIndividual from './QuestionAreaIndividual';
import Editor from './Editor';
import TopNavBar from './TopNavBar';
import {getQuestions, getQuestionsList} from "../api/QuestionApi";
import {getEventQuestions} from "../api/EventQuestionApi";
import {getEventByid} from "../api/EventApi";
import {getEventUser} from "../api/EventUserApi";

function QuestionRowIndividual() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventQuestionList, setEventQuestionList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');

    const getEventQuestionList = async () => {
        try {
            const response = await getQuestionsList(loginUser.accessToken, selectedEventId)
            setEventQuestionList(response.data);
            console.log(response)
        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    const getEventEntity = async () => {
        try {
            const response = await getEventByid(loginUser.asscessToken, selectedEventId)
            sessionStorage.setItem('eventStatus', response.data.status)
            const eventStatus = sessionStorage.getItem('eventStatus')
            const response1 = await getEventUser(loginUser.accessToken, selectedEventId)
            const eventUser = response1.data.firstName
            if (eventStatus === "O" && eventUser === loginUser.firstname) {
                console.log(eventUser);
                getEventQuestionList();
            }
        } catch (error) {
            console.error('can not find event', error);
        }
    }

    useEffect(() => {
        if (loginUser) {
            getEventEntity();
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