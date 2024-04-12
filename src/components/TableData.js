import {Checkbox} from 'react-bootstrap';
import React from 'react';

function TableData({ rowData }) {
    return (
        <tr>
            <td><Checkbox /></td>
            <td>{rowData.id}</td>
            <td>{rowData.values.join(', ')}</td>
            <td>{rowData.date}</td>
        </tr>
    );
}



export default TableData;