import React, { Component } from 'react';
import EditTask from './EditTask'
import { Form, Button, Card, Alert } from "react-bootstrap"
import styles from "./Task.module.scss";

export default class DisplayTaskComp extends Component {

  //todo 
  //todo 1. onChange
  //todo 2. onEdit
  //todo 3. handleDateChange
  //todo 4. isEditing
  //todo 5. onClick edit
  //todo 6. api
    render() {      
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(!this.props) {return <div>Cannot find the task.</div>}
      // else if(this.props.isEditing) {
      //   let task = this.props.entry[0];
      //   return <EditTask
      //           name={task?.name}
      //           descript={task?.descript}
      //           onEdit={onEdit}
      //           onChange={onChange}
      //           handleDateChange={handleDateChange}
      //           />
      // }
      else {
        let task = this.props.entry[0];   
        return (
            <>     
                    <h1 className="text-center"> {task?.name} </h1>
                    <br />
                    <h4>Description: </h4>
                    <div> {task?.descript} </div>
                    <br />
                    <h4>Due date: </h4>
                    <div> {task?.dueDate.split('T')[0]} {task?.dueDate.split('T')[1].split(':')[0]}:{task?.dueDate.split('T')[1].split(':')[1]} </div>
                    <br />                 
               
            </>
        )
      }                  
        
    }
  
}