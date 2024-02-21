import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

const editorStyle = {
    border: '1px solid lightgray',
};

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    onChange(newValue) {
        this.props.onChange(newValue);
    }

    onFocus(event) {
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    onLoad(editor) {
        editor.container.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            alert('Copy and paste is not allowed!');
            return false;
        }, false);
        
        // 添加阻止复制、剪切和粘贴的命令
        editor.commands.addCommand({
            name: 'breakTheEditor',
            bindKey: {
                win: 'Ctrl-C|Ctrl-V|Ctrl-X|Ctrl-Shift-V|Shift-Del',
                mac: 'Cmd-C|Cmd-V|Cmd-X',
            },
            exec: function () {
                // 阻止复制、剪切和粘贴
            },
        });

        ![
            'dragenter', 'dragover', 'dragend', 'dragstart', 'dragleave', 'drop'
        ].forEach(function(eventName) {
            editor.container.addEventListener(eventName, function(e) {
                e.stopPropagation();
            }, true);
        });
        editor.setOption('dragEnabled', false);
    }

    render() {
        return (
            <AceEditor
                style={editorStyle}
                readOnly={false}
                onChange={this.onChange}
                onFocus={this.onFocus}
                onLoad={this.onLoad}
                width="45vw"
                height="200px"
                mode="java"
                theme="github"
                name="aceCodeEditor"
                fontSize={14}
                showPrintMargin
                showGutter
                highlightActiveLine
                value={this.props.code}
                editorProps={{
                    $blockScrolling: true,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
                setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        );
    }
}

CodeEditor.propTypes = {
    code: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
};

export default CodeEditor;
