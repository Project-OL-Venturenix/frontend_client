import React, {createContext, useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import QuestionRowIndividual from './QuestionRowIndividual';
import LoginPage from './LoginPage';
import GameModePage from './GameModePage';
import QuestionRowTeam from './QuestionRowTeam';
import Ranking from './Ranking';
import SignupPage from "./SignUpPage";


export const TeamContext = createContext(null);

const App = () => {
    const Lucas = {
        name: 'Lucas',
        teamID: 1,
    };

    const Oscar = {
        name: 'Oscar',
        teamID: 1,
    };

    const Max = {
        name: 'Max',
        teamID: 1,
    };


    const team1 = [Lucas, Oscar, Max];

    const [loginUser, setLoginUser] = useState(null);
    const [team, setTeam] = useState(team1);


    useEffect(() => {

    }, []);

    return (
        <>
            <TeamContext.Provider value={team}>

                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/contest" component={QuestionRowIndividual} />
                    <Route path="/team" component={QuestionRowTeam} />
                    <Route path="/gamemode" component={GameModePage} />
                    <Route path="/ranking" component={Ranking} />
                    <Route path="/signup" component={SignupPage} />
                </Switch>
            </TeamContext.Provider>
        </>
    );
};

export default App;
