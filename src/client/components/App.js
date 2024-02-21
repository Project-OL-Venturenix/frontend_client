import React, {createContext, useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import QuestionRowIndividual from './QuestionRowIndividual';
import LoginPage from './LoginPage';
import GameModePage from './GameModePage';
import QuestionRowTeam from './QuestionRowTeam';
import Ranking from "./Ranking";
import AdminPage from "./AdminPage";

export const LoginUserContext = createContext(null);
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

    const [loginUser, setLoginUser] = useState(Lucas);
    const [team, setTeam] = useState(team1);


    useEffect(() => {
    }, []);

    return (
        <>
            <TeamContext.Provider value={team}>
            <LoginUserContext.Provider value={loginUser}>
                <Switch>
                    <Route exact path="/" render={(props) => <LoginPage {...props} setLoginUser={setLoginUser} />} />
                    <Route path="/contest" component={QuestionRowIndividual} />
                    <Route path="/team" component={QuestionRowTeam} />
                    <Route path="/gamemode" component={GameModePage} />
                    <Route path="/ranking" component={Ranking} />
                    <Route path="/adminpage" component={AdminPage} />
                </Switch>
            </LoginUserContext.Provider>
            </TeamContext.Provider>
        </>
    );
};

export default App;
