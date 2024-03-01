import React, {useContext, useEffect, useState} from 'react';
import {Navbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {TeamContext} from './App';
import {getEventUsers} from "../api/EventUserApi";
import {getUserById, getUsers} from "../api/UserApi";
import {getEventGroups} from "../api/EventGroupApi";
import {getGroupUsers} from "../api/GroupUserApi";
import {getEventByid} from "../api/EventApi";

export default function TopNavBarTeam() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;

    const [team, setTeam] = useState([])
    const teamColors = {};
    const colorArray = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

    team.forEach((member, index) => {
        teamColors[member.id] = colorArray[index % colorArray.length];
    });

    // const [eventUserList, setEventUserList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');
    const [eventName, setEventName] = useState("");

    const getEventGroupUserList = async () => {
        try {
            await getEventById(selectedEventId);
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
                .filter(user => user.userId === loginUser.id)
                .map(user => user.groupId);
            console.log("userGroupIds:", userGroupIds);

            // Filter selectedEventGroups based on the user's group membership
            const userEventGroups = selectedEventGroups.filter(group => userGroupIds.includes(group.groupid));
            console.log("userEventGroups:", userEventGroups);


            // Get all users in the userEventGroups
            const userEventGroupUsers = groupUsers
                .filter(user => userEventGroups.some(group => group.groupId === user.groupid))
                .map(user => ({
                    userid: user.userId,
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

    const getEventById = async (id) => {
        try {
            const response = await getEventByid(loginUser.accessToken, id);
            setEventName(response.data.name)
        } catch (error) {
            console.error('Failed to get events:', error);
        }
    };


    useEffect(() => {
        getEventGroupUserList()
        console.log('Team state has been updated:', team);
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

                <div style={{display: 'flex'}}>
                    {team.map((_, index) => (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                margin: '10px',
                            }}>
                            <FontAwesomeIcon
                                icon={faCircleUser}
                                style={{
                                    color: teamColors[team[index].id],
                                    marginRight: '10px',
                                }}
                                size="4x"
                            />
                            <span style={{
                                fontSize: '2em',
                                fontWeight: team[index].id === loginUser.id ?
                                    'bold'
                                    : 'normal',
                                color: team[index].id === loginUser.id ?
                                    teamColors[team[index].id]
                                    : 'black'
                            }}>
                            {team[index].firstname}
                            </span>
                        </div>
                    ))}
                </div>

                <div/>
            </Navbar>
        </>
    );
}
