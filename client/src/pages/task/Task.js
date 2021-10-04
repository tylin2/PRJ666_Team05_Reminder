import React from "react";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class TaskItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {expand: true};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            expand: !prevState.expand
        }));
      }

    render() {
        let todoEntries = this.props.entries;
        let i=1;
        let listItems = todoEntries.map(task=>
            <tr key={task.key}>
                <td><InputGroup className="mb-3">
    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
  </InputGroup></td>
                <td onClick={this.handleClick}>{task.name}</td>
                <td hidden={this.state.expand}>{task.description}</td>
            </tr>
        );
        return <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Todo list</th>
          </tr>
        </thead>
        <tbody>
            {listItems}
        </tbody>
      </Table>;
    }
}

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(event) {
        if(this._inputElement.value !== "") {
            let newItem = new Object();
            newItem.name = this._inputElement.value;
            newItem.key = Date.now();
            newItem.description = "";

            if(this._textAreaElement.value!=="")
            newItem.description = this._textAreaElement.value;

            this.setState((prevState)=>{
                return {
                    tasks: prevState.tasks.concat(newItem)
                };
            });
            this._inputElement.value="";
            this._textAreaElement.value="";
        }

        console.log(this.state.tasks);
        event.preventDefault();
    }

    render(){
        return(
            <div>
            <Form onSubmit={this.addItem}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" ref={(a) => this._inputElement = a} placeholder="enter task" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" ref={(a) => this._textAreaElement = a} rows={3} />
                </Form.Group>
                <Button as="input" type="submit" value="Create" />
            </Form>
            <TaskItems entries={this.state.tasks}/>
            </div>
        )
    }
}

export default TaskForm;