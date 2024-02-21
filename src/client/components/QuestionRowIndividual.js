import React from 'react';
import QuestionAreaIndividual from './QuestionAreaIndividual';
import Editor from './Editor';
import TopNavBar from './TopNavBar';

function QuestionRowIndividual() {
    return (
        <>
            <TopNavBar/>
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
                        <QuestionAreaIndividual/>
                    </div>
                    <Editor/>
                </div>
            ))}
        </>
    );
}

export default QuestionRowIndividual;