import React, { Component } from 'react';
import EditTask from './EditTask'
import { Form, Button, Card, Alert } from "react-bootstrap"
import styles from "./Task.module.scss";
import moment from "moment";
import "moment-timezone";


export default class DisplayTaskComp extends Component {

    render() {      
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(!this.props) {return <div>Cannot find the task.</div>}
      else {
        let task = this.props.entry[0];   
        let priorityString='';
        if(task?.priority==='P1') {
          priorityString = 'Priority 1';
        }else if(task?.priority==='P2') {
          priorityString = 'Priority 2';
        }else if(task?.priority==='P3') {
          priorityString = 'Priority 3';
        }else {
          priorityString = 'Priority 4';
        }

        let classByPriority;
        if(task?.priority === 'P1') {
          classByPriority=styles.p1;
        }else if(task?.priority === 'P2'){
          classByPriority=styles.p2;
        }else if(task?.priority === 'P3'){
          classByPriority=styles.p3;
        }else {
          classByPriority=styles.p4;
        }

        

        return (
            <>     
                    <h1 className="text-center"> {task?.name} </h1>
                    <br />
                    <h4>Description: </h4>
                    <div> {task?.descript} </div>
                    <br />
                    <h4>Due date: </h4>
                    <div> {moment(task?.dueDate).tz("America/Toronto").format("YYYY-MM-DD HH:mm")} </div>
                    <br />              
                    <h4 className={classByPriority}>{priorityString}</h4>
                    <br />                 
                    <h4>Notification on/off: {task?.notification?'On':'Off'}</h4>            
            </>
        )
      }                  
        
    }
  
}