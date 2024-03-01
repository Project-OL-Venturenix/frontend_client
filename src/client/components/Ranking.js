import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle} from 'recharts';
import {Col} from 'react-bootstrap';
import {faCircleCheck, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const data = [
    { name: 'A', Q1: 10, Q2: 50, Q3: 30 },
    { name: 'B', Q1: 15, Q2: 25, Q3: 35 },
    { name: 'C', Q1: 20, Q2: 30, Q3: 40 },
];

const sortedData = data.slice().sort((a, b) => {
    const totalScoreA = a.Q1 + a.Q2 + a.Q3;
    const totalScoreB = b.Q1 + b.Q2 + b.Q3;

    return totalScoreB - totalScoreA;
});

const RoundedRectangle = (props) => {
    const { x, y, width, height, fill, radius } = props;

    return (
        <g>
            {/* 上面的矩形 */}
            <rect x={x} y={y} width={width} height={height} fill={fill} rx={radius} ry={radius} />
        </g>
    );
};

const CustomBar = (props) => {
    let { x, y, width, height, fill, iconRight, iconWrong } = props;
    const borderRadius = 5; // 設定圓角半徑，根據需要調整


    iconRight = Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon icon={faCircleCheck} style={{color: '#63E6BE',}} />
    ));

    iconWrong = Array.from({ length: 5 }, (_, index) => (
        <FontAwesomeIcon icon={faCircleXmark} style={{color: '#c40808',}} />
    ));

    return (
        <g>
            {/* 背景矩形 */}
            <RoundedRectangle x={x} y={y} width={width} height={height} fill={fill} radius={borderRadius} />

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
                        <h5 style={{ marginBottom: '5px' }}>Test Case:</h5>
                        <h5 style={{ marginBottom: '5px'}}>{iconRight}</h5>
                        <h5>{iconWrong}</h5>
                    </Col>
                </div>
            </foreignObject>
        </g>
    );
};


const Ranking = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                backgroundColor: '#F1FEC9'
            }}
        >
        <ResponsiveContainer
            width={1500}
            height={500}
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
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="Q1" stackId="stack" fill="#8884d8" shape={<CustomBar fill="#8884d8" />} />
                <Bar dataKey="Q2" stackId="stack" fill="#82ca9d" shape={<CustomBar fill="#82ca9d" />} />
                <Bar dataKey="Q3" stackId="stack" fill="#ffc658" shape={<CustomBar fill="#ffc658" />} />
            </BarChart>
        </ResponsiveContainer>
        </div>
    );
};

export default Ranking;
