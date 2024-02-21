import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 样式
import questionText from './QuestionText';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function QuestionAreaIndividual() {
    return (
        <>
            <div
                style={{
                    width: '45vw',
                    maxHeight: '65vh',
                    overflow: 'auto',
                    color: 'black',
                    fontSize: 14
                }}
            >
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={questionText}/>
            </div>

        </>
    );
}

export default QuestionAreaIndividual;