import React, {useState, useEffect} from 'react';
import {getUserScoresByEventId} from "../api/UserScoresApi";
import {Redirect} from "react-router-dom";


const DetailDashboard = () => {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const selectedEventId = sessionStorage.getItem('selectedEventId');
    const [userTestDataList, setUserTestDataList] = useState([]);
    const [redirectToDash, setRedirectToDash] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserScoresByEventId(loginUser.accessToken, selectedEventId);
                // 对用户测试数据列表按照总分排序
                const sortedUserDataList = response.data.result.sort((a, b) => {
                    const totalScoreA = a.score.Q1 + a.score.Q2 + a.score.Q3;
                    const totalScoreB = b.score.Q1 + b.score.Q2 + b.score.Q3;
                    return totalScoreB - totalScoreA; // 降序排列
                });
                setUserTestDataList(sortedUserDataList);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [loginUser.accessToken, selectedEventId]);

    const handleDashboard = () => {
        setRedirectToDash(true);
    };

    if (redirectToDash) {
        return <Redirect to="/rankingteam"/>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button
                style={{backgroundColor: '#198754'}}
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleDashboard}
            >
                Dashboard
            </button>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Score</th>
                        <th>Passing Test Cases</th>
                        <th>Submit Time</th>
                        <th>Runtime</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userTestDataList.map((userTestData, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td rowSpan="3">{userTestData.name}</td>
                                <td>Q1: {userTestData.score.Q1}</td>
                                <td>{userTestData.passingTestCaseNumber.Q1}</td>
                                <td>{userTestData.submitTime.Q1}</td>
                                <td>{userTestData.runtime.Q1}</td>
                            </tr>
                            <tr>
                                <td>Q2: {userTestData.score.Q2}</td>
                                <td>{userTestData.passingTestCaseNumber.Q2}</td>
                                <td>{userTestData.submitTime.Q2}</td>
                                <td>{userTestData.runtime.Q2}</td>
                            </tr>
                            <tr>
                                <td>Q3: {userTestData.score.Q3}</td>
                                <td>{userTestData.passingTestCaseNumber.Q3}</td>
                                <td>{userTestData.submitTime.Q3}</td>
                                <td>{userTestData.runtime.Q3}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailDashboard;