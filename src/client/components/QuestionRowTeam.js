import React, {useContext, useState} from 'react';
import Editor from './Editor';
import {Checkbox} from 'react-bootstrap';
import TopNavBarTeam from './TopNavBarTeam';
import {LoginUserContext, TeamContext} from "./App";
import QuestionAreaTeam from "./QuestionAreaTeam";

function QuestionRowTeam() {
    const loginUser = useContext(LoginUserContext);
    const team = useContext(TeamContext);

    const teamColors = {};
    const colorArray = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];

    team.forEach((member, index) => {
        teamColors[member.name] = colorArray[index % colorArray.length];
    });

    const [focusedIndex, setFocusedIndex] = useState(null);

    const handleColorChange = (index) => {
        setFocusedIndex(index);
    };

    return (
        <>
            <TopNavBarTeam/>
            {Array.from({length: 3}).map((_, index) => (
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
                        <QuestionAreaTeam borderColor={focusedIndex === index ? teamColors[loginUser.firstname] : 'transparent'}/>
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