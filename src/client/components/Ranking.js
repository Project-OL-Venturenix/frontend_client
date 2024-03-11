import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle} from 'recharts';
import {Col} from 'react-bootstrap';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getUserTestCase} from "../api/UserTestCaseApi";
import {getEventQuestions} from "../api/EventQuestionApi";
import {getQuestions} from "../api/QuestionApi";
import {getUserScoresByEventId} from "../api/UserScoresApi";
import {getUserQuestionSubmit} from "../api/UserQuestionSubmit";
import {getUserById} from "../api/UserApi";

const Ranking = () => {

    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [sortedData, setSortedData] = useState();
    const [eventQuestionList, setEventQuestionList] = useState([]);
    const selectedEventId = sessionStorage.getItem('selectedEventId');
    const [userQuestionSubmitList, setUserQuestionSubmitList] = useState();


    const getUserQuestionSubmitList = async () => {
        try {
            const response = await getUserQuestionSubmit(loginUser.accessToken);
            setUserQuestionSubmitList(response.data);

        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    }

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


    const getUserTestCaseList = async () => {
        try {
            const response = await getUserScoresByEventId(loginUser.accessToken, selectedEventId);
            const userTestCaseDataList = response.data.result
            console.log(userTestCaseDataList)


            const data = [];

            for (const userTestData of userTestCaseDataList) {
                const newDataEntry = {
                    name: userTestData.name,
                    Q1: userTestData.score.Q1,
                    Q2: userTestData.score.Q2,
                    Q3: userTestData.score.Q3,
                };

                data.push(newDataEntry);
            }


            const sortedData = data.slice().sort((a, b) => {
                const totalScoreA = a.Q1 + a.Q2 + a.Q3;
                const totalScoreB = b.Q1 + b.Q2 + b.Q3;

                return totalScoreB - totalScoreA;
            });

            setSortedData(sortedData);
            console.log(sortedData)

        } catch (error) {
            console.error('Failed to get events:', error);
        }
    }

    useEffect(() => {
        getEventQuestionList();
        getUserTestCaseList();
        getUserQuestionSubmitList();
    }, []);


    const RoundedRectangle = (props) => {
        const {x, y, width, height, fill, radius} = props;

        return (
            <g>
                {/* 上面的矩形 */}
                <rect x={x} y={y} width={width} height={height} fill={fill} rx={radius} ry={radius}/>
            </g>
        );
    };

    const CustomBar = (props) => {
        let {x, y, width, height, fill, iconRight, iconWrong, data} = props;
        const borderRadius = 5; // 設定圓角半徑，根據需要調整

        iconRight = Array.from({length: data.Q1}, (_, index) => (
            <FontAwesomeIcon icon={faCircleCheck} style={{color: '#63E6BE',}}/>
        ));

        iconWrong = Array.from({length: (10 - data.Q1)}, (_, index) => (
            <FontAwesomeIcon icon={faCircleXmark} style={{color: '#c40808',}}/>
        ));

        console.log(userQuestionSubmitList);
        let filteredUserQuestionSubmit = null;

        if (Array.isArray(userQuestionSubmitList) && userQuestionSubmitList.length > 0) {
            filteredUserQuestionSubmit = userQuestionSubmitList.find(
                item =>
                    item.eventid == selectedEventId &&
                    item.questionid == 1
                    //&& item.userid == data.name
            );
        }





        return (
            <g>
                <>
                    {/* 背景矩形 */}
                    <RoundedRectangle x={x} y={y} width={width} height={height} fill={fill} radius={borderRadius}/>

                    {/* 內容 */}
                    <foreignObject x={x} y={y} width={parseFloat(width)} height={height}>
                        <div className="container"
                             style={{
                                 width: '100%',
                                 height: '100%',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 position: 'relative',
                                 fontSize: 'auto'
                             }}
                        >
                            <Col>
                                {/*<h5 style={{marginBottom: '5px'}}>Test Case:</h5>*/}
                                <h5 style={{marginBottom: '5px'}}>{iconRight}{iconWrong}</h5>
                                {data.Q1>0? "Question Pass" : "Question Fail"}
                                {filteredUserQuestionSubmit && (
                                    <div>
                                        Submittime: {filteredUserQuestionSubmit.submittime}
                                        <br />
                                        Runtime: {filteredUserQuestionSubmit.runtimebymsec}ms
                                        <br />
                                    </div>
                                )}
                            </Col>
                        </div>
                    </foreignObject>
                </>

            </g>
        );
    };

    const CustomBar2 = (props) => {
        let {x, y, width, height, fill, iconRight, iconWrong, data} = props;
        const borderRadius = 5; // 設定圓角半徑，根據需要調整

        iconRight = Array.from({length: data.Q2}, (_, index) => (
            <FontAwesomeIcon icon={faCircleCheck} style={{color: '#63E6BE',}}/>
        ));

        iconWrong = Array.from({length: (10 - data.Q2)}, (_, index) => (
            <FontAwesomeIcon icon={faCircleXmark} style={{color: '#c40808',}}/>
        ));

        console.log(userQuestionSubmitList);
        let filteredUserQuestionSubmit = null;

        if (Array.isArray(userQuestionSubmitList) && userQuestionSubmitList.length > 0) {
            filteredUserQuestionSubmit = userQuestionSubmitList.find(
                item =>
                    item.eventid == selectedEventId &&
                    item.questionid == 2
                //&& item.userid == data.name
            );
        }





        return (
            <g>
                <>
                    {/* 背景矩形 */}
                    <RoundedRectangle x={x} y={y} width={width} height={height} fill={fill} radius={borderRadius}/>

                    {/* 內容 */}
                    <foreignObject x={x} y={y} width={parseFloat(width)} height={height}>
                        <div className="container"
                             style={{
                                 width: '100%',
                                 height: '100%',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 position: 'relative',
                                 fontSize: 'auto'
                             }}
                        >
                            <Col>
                                {/*<h5 style={{marginBottom: '5px'}}>Test Case:</h5>*/}
                                <h5 style={{marginBottom: '5px'}}>{iconRight}{iconWrong}</h5>
                                {data.Q2>0? "Question Pass" : "Question Fail"}
                                {filteredUserQuestionSubmit && (
                                    <div>
                                        Submittime: {filteredUserQuestionSubmit.submittime}
                                        <br />
                                        Runtime: {filteredUserQuestionSubmit.runtimebymsec}ms
                                        <br />
                                    </div>
                                )}
                            </Col>
                        </div>
                    </foreignObject>
                </>

            </g>
        );
    };

    const CustomBar3 = (props) => {
        let {x, y, width, height, fill, iconRight, iconWrong, data} = props;
        const borderRadius = 5; // 設定圓角半徑，根據需要調整

        iconRight = Array.from({length: data.Q3}, (_, index) => (
            <FontAwesomeIcon icon={faCircleCheck} style={{color: '#63E6BE',}}/>
        ));

        iconWrong = Array.from({length: (10 - data.Q3)}, (_, index) => (
            <FontAwesomeIcon icon={faCircleXmark} style={{color: '#c40808',}}/>
        ));

        console.log(userQuestionSubmitList);
        let filteredUserQuestionSubmit = null;

        if (Array.isArray(userQuestionSubmitList) && userQuestionSubmitList.length > 0) {
            filteredUserQuestionSubmit = userQuestionSubmitList.find(
                item =>
                    item.eventid == selectedEventId &&
                    item.questionid == 3
                //&& item.userid == data.name
            );
        }





        return (
            <g>
                <>
                    {/* 背景矩形 */}
                    <RoundedRectangle x={x} y={y} width={width} height={height} fill={fill} radius={borderRadius}/>

                    {/* 內容 */}
                    <foreignObject x={x} y={y} width={parseFloat(width)} height={height}>
                        <div className="container"
                             style={{
                                 width: '100%',
                                 height: '100%',
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 position: 'relative',
                                 fontSize: 'auto'
                             }}
                        >
                            <Col>
                                {/*<h5 style={{marginBottom: '5px'}}>Test Case:</h5>*/}
                                <h5 style={{marginBottom: '5px'}}>{iconRight}{iconWrong}</h5>
                                {data.Q3>0? "Question Pass" : "Question Fail"}
                                {filteredUserQuestionSubmit && (
                                    <div>
                                        Submittime: {filteredUserQuestionSubmit.submittime}
                                        <br />
                                        Runtime: {filteredUserQuestionSubmit.runtimebymsec}ms
                                        <br />
                                    </div>
                                )}
                            </Col>
                        </div>
                    </foreignObject>
                </>

            </g>
        );
    };


    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: '#F1FEC9'
            }}
        >
            <ResponsiveContainer

            >

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <h1>Ranking</h1>
                </div>


                <BarChart
                    data={sortedData}
                    layout="vertical"
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip/>
                    <Legend/>
                    {/*<Bar dataKey="Q1" stackId="stack" fill="#8884d8" shape={<CustomBar fill="#8884d8"/>}/>*/}
                    {/*<Bar dataKey="Q2" stackId="stack" fill="#82ca9d" shape={<CustomBar2 fill="#82ca9d"/>}/>*/}
                    {/*<Bar dataKey="Q3" stackId="stack" fill="#ffc658" shape={<CustomBar3 fill="#ffc658"/>}/>*/}
                    <Bar
                        dataKey="Q1"
                        stackId="stack"
                        fill="#8884d8"
                        shape={(props) => <CustomBar {...props} data={props.payload}/>}
                    />
                    <Bar
                        dataKey="Q2"
                        stackId="stack"
                        fill="#82ca9d"
                        shape={(props) => <CustomBar2 {...props} data={props.payload}/>}
                    />
                    <Bar
                        dataKey="Q3"
                        stackId="stack"
                        fill="#ffc658"
                        shape={(props) => <CustomBar3 {...props} data={props.payload}/>}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Ranking;
