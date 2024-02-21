import React, {useContext} from 'react';
import {Navbar} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons';
import {LoginUserContext, TeamContext} from './App';

export default function TopNavBarTeam() {
    const loginUser = useContext(LoginUserContext);
    const team = useContext(TeamContext);
    const teamColors = {};
    const colorArray = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

    team.forEach((member, index) => {
        teamColors[member.name] = colorArray[index % colorArray.length];
    });

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
                                    color: teamColors[team[index].name],
                                    marginRight: '10px',
                                }}
                                size="4x"
                            />
                            <span style={{
                                fontSize: '2em',
                                fontWeight: team[index].name === loginUser.name ?
                                    'bold'
                                    : 'normal',
                                color: team[index].name === loginUser.name ?
                                    teamColors[team[index].name]
                                    : 'black'
                            }}>
                            {team[index].name}
                            </span>
                        </div>
                    ))}
                </div>
            </Navbar>
        </>
    );
}
