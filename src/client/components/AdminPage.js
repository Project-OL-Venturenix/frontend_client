import React, {useContext, useState} from 'react';
import {Checkbox, Table} from 'react-bootstrap';
import {LoginUserContext} from './App';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import questionText from './QuestionText';
import TableData from "./TableData";

function AdminPage() {
    const loginUser = useContext(LoginUserContext);
    const [checkedStates, setCheckedStates] = useState(Array(3).fill(false));

    const handleCheckboxChange = (index) => {
        setCheckedStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    const tableData = [
        { id: 1, values: [1,2,3], date: '1/1/2024' },
    ];


    return (
        <>
            <h1>Event Number</h1>

            <div className="input-group input-group-sm mb-3" style={{width: '100px'}}>
                <span className="input-group-text" id="inputGroup-sizing-sm">No</span>
                <input type="text" className="form-control" aria-label="Sizing example input"
                       aria-describedby="inputGroup-sizing-sm"/>
            </div>

            <button>Create</button>
            <button>Update</button>
            <button>Delete</button>

            <Table className="align-middle">
                <thead>
                <tr>
                    <th></th>
                    <th>Event No</th>
                    <th>Question</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((rowData, index) => (
                    <TableData key={index} rowData={rowData} />
                ))}
                </tbody>
            </Table>


            {Array.from({length: 3}).map((_, index) => (
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '100px',
                        marginLeft: '20px'
                    }}>

                    <div
                        style={{
                            marginLeft: '20px'
                        }}>
                        <div
                            style={{
                                width: '80vw',
                                maxHeight: '60vh',
                                overflow: 'auto',
                                color: 'black',
                                fontSize: 14
                            }}
                        >
                            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={questionText}/>
                        </div>
                    </div>


                    <div style={{
                        marginLeft: '30px'
                    }}>
                        <Checkbox
                            checked={checkedStates[index]}
                            onChange={() => handleCheckboxChange(index)}/>
                    </div>
                </div>


            ))}
        </>
    );
}

export default AdminPage;