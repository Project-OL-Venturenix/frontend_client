import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {getGroupUsers} from "../api/GroupApi";

const GameModePage = () => {
    const [selection, setSelection] = useState(null);

    const handleSelection = (value) => {
        setSelection(value);
    };



    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#F1FEC9'
            }}
        >
            <h1 style={{marginTop: '20px'}}>Event Number</h1>

            <div className="input-group input-group-sm mb-3" style={{width: '100px'}}>
                <span className="input-group-text" id="inputGroup-sizing-sm">No</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <h1 style={{marginTop: '20px'}}>Mode</h1>

            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <FontAwesomeIcon icon={faUsers}
                                 style={{
                                     width: '20vw',
                                     height: '30vh',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     margin: '100px',

                                 }}
                                 onClick={() => handleSelection('team')}
                >
                    <h4>Team</h4>
                </FontAwesomeIcon>

                <FontAwesomeIcon icon={faUser}
                                 style={{
                                     width: '20vw',
                                     height: '30vh',
                                     display: 'flex',
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     margin: '100px',
                                 }}
                                 onClick={() => handleSelection('individual')}
                >
                    <h4>Individual</h4>
                </FontAwesomeIcon>
            </div>


            <div>
                <h1>You choose {selection === 'team' ? 'Team' : 'Individual'}</h1>
            </div>


            {(
                <Link to={selection === 'team' ? '/team' : '/contest'}>
                    <button
                        style={{
                        margin: '30px',
                            width: '200px',
                            height: '50px',
                            fontSize: 14
                    }}
                        type="button" className="btn btn-primary">Confirm</button>
                </Link>
            )}


        </div>
    );
};


export default GameModePage;