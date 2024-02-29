import React from 'react';
import {Form, FormGroup, Col, Button, Grid} from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import AlertDismissable from './controls/AlertDismissable';
import OutputBox from './controls/OutputBox';
import StatusImage from './controls/StatusImage';
import CompilerApi from '../api/CompilerApi';

let languages = ['Java', 'Python', 'JavaScript', 'C', 'C++'];
const languagesProd = ['JavaScript', 'Python'];

class Editor extends React.Component {
    constructor(props) {
        super(props);

        console.log(`env: ${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV === 'production') {
            languages = languagesProd;
        }

        this.state = {
            selectedLang: 0, // JavaScript
            task: {
                lang: 'Java',
                code: '',
            },
            response: {
                status: '0',
                message: '',
            },
            executionTime: 0,
            output: '',
        };

        this.handleRun = this.handleRun.bind(this);
        this.updateSolution = this.updateSolution.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }

    componentDidMount() {
        CompilerApi.getTask('java') //default load java file
            //  .then(res => res.json())
            .then((task) => {
                console.log(task);
                this.setState({task});
            });
    }

    handleCodeChange(code) {
        const {task} = this.state;
        task.code = code;
        console.log(code);
        return this.setState({task});
    }

    handleRun(event) {
        event.preventDefault();
        const {task} = this.state;
        const startTime = new Date().getTime();
        console.log('handleRun : ' + task.code);
        console.log('handleRun : ' + task.lang);
        console.log('handleRun : ' + this.state.output);

        CompilerApi.run(task)
            .then((res) => {
                // Append the new test case result to the existing message
                const endTime = new Date().getTime();
                const executionTime = endTime - startTime;
                this.setState({response: res, executionTime});
                this.setState({response: res});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateSolution(event) {
        // event.preventDefault();
        console.log(this.state.task);
        const field = event.target.name;
        const {task} = this.state;
        task[field] = event.target.value;
        return this.setState({task});
    }

    handleLangChange(event) {
        const index = parseInt(event.target.value, 10);
        CompilerApi.getTask(languages[index]).then((task) => {
            console.log(task);
            this.setState({task});
        });
        const response = {status: '0', message: ''};
        this.setState({response});
        return this.setState({selectedLang: index});
    }

    render() {
        return (
            <div className="container">
                <Form horizontal>
                    <FormGroup controlId="code">
                        <Col sm={12}>
                            <LangSelector
                                langs={languages}
                                selectedIndex={this.state.selectedLang}
                                onChange={this.handleLangChange}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="code">
                        <Col sm={12}>
                            <CodeEditor
                                onChange={(code) => {
                                this.handleCodeChange(code);
                            }}
                            onFocus={this.props.handleColorChange}
                            code={this.state.task.code}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={5}>
                            <Grid className="col-md-6">
                                <Button bsStyle="primary" type="button" style={{fontSize: '15px'}}
                                        onClick={this.handleRun}>
                                    Run Code
                                </Button>
                            </Grid>
                            <Grid className="col-md-6">
                                <Button bsStyle="success" type="button" style={{fontSize: '15px'}}
                                        onClick={this.handleRun}>
                                    Submit Code
                                </Button>
                            </Grid>
                            <Grid className="col-md-6">
                                <StatusImage
                                    hasError={this.state.response.status !== '0'}
                                    message={this.state.response.message}
                                />
                                <div>Run Time: {this.state.executionTime}</div>
                            </Grid>
                        </Col>
                        <Col sm={10}/>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <AlertDismissable
                                show={this.state.response.status !== '0'}
                                message={this.state.response.message}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={12}>
                            <OutputBox
                                show={this.state.response.status === '0'}
                                message={this.state.response.message}
                            />
                            {/* <OutputBox show={true} message={this.state.output} /> */}
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

export default Editor;