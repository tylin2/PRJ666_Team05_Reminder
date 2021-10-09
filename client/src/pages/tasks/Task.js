import React from "react";
import TaskList from "./taskList";

import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TaskItems extends React.Component {
    constructor(props) {
        super(props);
    }

    createTasks(item) {
        return <div>
            <p>{this.props.value.title}</p>
            <p>Description: {this.props.value.description}</p>
        </div>
    }

    render() {
        let todoEntries = this.props.entries;
        let listItems = todoEntries.map(task=>
            <div key={task.index}>
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
        );
        return <div>{listItems}</div>;
    }
}

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentObj: {
                // id: 0,
                title: '',
                description: ''
            },
            taskArr: []
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleTitle(event) {
        let dummy=this.state.currentObj;
        dummy.title=event.target.value;
        this.setState({currentObj: dummy });
        console.log(this.state.currentObj);
    }
    handleDescription(event) {
        let dummy = this.state.currentObj;
        dummy.description=event.target.value;
        this.setState({currentObj: dummy });
        console.log(this.state);
    }
    handleSubmit(event) {
        //fetch: add and get id property.
        alert('A new task was submitted: \n' + this.state.currentObj.title + ': ' + this.state.currentObj.description);
        
        //let dummy = this.state.taskArr.push(this.state.currentObj);
        //this.setState({taskArr: dummy});
        // this.setState((prevState)=>{
        //     return {
        //         taskArr: prevState.taskArr.concat([prevState.currentObj])
        //     }
        // });
        this.setState(
            // taskArr: this.state.taskArr.concat([this.state.currentObj]) //reference가 copy된건가봐...
            {
                currentObj: {
                    // id: 0,
                    title: '',
                    description: ''
                },
                taskArr: this.state.taskArr.concat({
                    title: this.state.currentObj.title,
                    description: this.state.currentObj.description
                })
            }
            
        );
        console.log(this.state.currentObj);
        console.log(this.state.taskArr);
        //currentObj를 초기화 해야하나...
        event.preventDefault();
    }

    render(){
        return(
            <div>
            <h1 style={{fontSize: 28}}>Task List</h1>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={this.state.currentObj.title} onChange={this.handleTitle}/>
                    {/* <input type="text" value={this.state.currentObj.title}/> */}
                </label>
                <br/>
                <label>
                    Description:<br/>
                    <textarea value={this.state.currentObj.description} onChange={this.handleDescription}/>
                    {/* <textarea value={this.state.currentObj.description} /> */}
                </label>
                {/* <input type="submit" value="Submit"/> */}
                <br />
                <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} size="lg">Create New Task</Button>
            </form>
            <br/>
                <TaskList entries={this.state.taskArr}/>
            </div>
            
        )
    }
}

export default TaskForm;