import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 样式
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


function QuestionAreaIndividual({question}) {
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
                {/*<ReactMarkdown rehypePlugins={[rehypeRaw]} children={question.question}/>*/}
                <ReactMarkdown>{question.question}</ReactMarkdown>
            </div>

        </>
    );
}

export default QuestionAreaIndividual;