import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap 样式
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

function QuestionAreaTeam({ borderColor, question }) {
    return (
        <>
            <div
                style={{
                    width: '45vw',
                    maxHeight: '65vh',
                    overflow: 'auto',
                    border: `2px solid ${borderColor || 'transparent'}`, // 使用 textColor 或透明色
                    borderRadius: '5px',  // 可選的，添加圓角
                    padding: '20px',  // 可選的，添加內邊距
                    fontSize: 14
                }}
            >
                <ReactMarkdown rehypePlugins={[rehypeRaw]} children={question.question}/>
            </div>

        </>
    );
}

export default QuestionAreaTeam;