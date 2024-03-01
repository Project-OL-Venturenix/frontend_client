import React, {useContext, useEffect, useState} from 'react';
import {Navbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {getEventQuestions} from "../api/EventQuestionApi";
import {getQuestions} from "../api/QuestionApi";
import {getEventUsers} from "../api/EventUserApi";
import {getUsers} from "../api/UserApi";
import {getEventByid, getEvents} from "../api/EventApi";

export default function TopNavBar() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [eventUserList, setEventUserList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');
    const [eventName, setEventName] = useState("");

    const getEventUserList = async () => {
        try {
            await getEventById(selectedEventId);
            const response = await getEventUsers(loginUser.accessToken);
            const eventUsers = response.data;
            console.log(eventUsers)
            const selectedEventUsers = eventUsers.filter(user => user.eventid === parseInt(selectedEventId, 10));
            console.log("Selected Event ID:", parseInt(selectedEventId, 10));
            console.log("Filtered Users:", selectedEventUsers);
            const userIds = selectedEventUsers.map((user) => user.userid);
            const UserData = await getUsers(loginUser.accessToken);
            const userList = UserData.data;
            console.log("UserList:", userList);
            console.log("UserIds:", userIds);
            const filteredUser = userList.filter((user) => userIds.includes(user.id));
            console.log("filteredUser:", filteredUser);
            setEventUserList(filteredUser);

        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    const getEventById = async (id) => {
        try {
            const response = await getEventByid(loginUser.accessToken, id);
            setEventName(response.data.name)
        } catch (error) {
            console.error('Failed to get events:', error);
        }
    };

    useEffect(() => {
        getEventUserList()
    }, []);

    return (
        <>
            <Navbar
                sticky="top"
                style={{
                    backgroundColor: '#8AC453',
                    width: '100vw',
                    height: '80px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >

                <div style={{display: 'flex', fontSize: "30px"}}>{eventName}</div>

                <div/>
                <div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FontAwesomeIcon
                            icon={faCircleUser}
                            style={{
                                color: '#FFD43B',
                                marginRight: '10px',
                            }}
                            size="4x"
                        />
                        {loginUser && (
                            <div>
                                {eventUserList.length > 0 ? (
                                    eventUserList.map((user, index) => (
                                        <span key={index} style={{fontSize: '2em'}}>
                                        {user.firstname}
                                         </span>
                                    ))
                                ) : (
                                    <span style={{fontSize: '1.5em'}}>
                                    You are not in this contest.
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div/>
                <div/>
            </Navbar>
        </>
    )
        ;
}
