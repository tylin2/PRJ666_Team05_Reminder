import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Task.module.scss";
import TaskItem from './taskItem';

export default class TaskList2 extends Component  {    
   render() {
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else {
        let tasks = this.props.entries;
        let sorted = tasks.sort((a, b) =>{
            //if(typeof a.dueDate === 'Date')
            if(typeof a.dueDate !== 'string') a.dueDate.toISOString()
            if(typeof b.dueDate !== 'string') b.dueDate.toISOString()
            return a.dueDate.split('T')[0].split('-').reverse().join().localeCompare(b.dueDate.split('T')[0].split('-').reverse().join())
            }
            
        );
       return (
           <>
           <br />
           <Card style={{ width: "90rem" }} className={styles.card}>
               <Card.Body>
                    {/* <h1 className="text-center" style={{color: 'black'}}>Task List</h1> */}
                    <h1 className="text-center" >Task List</h1>
                    <ListGroup>
                       
                        {sorted.map(task => {
                            if(task.isCompleted === false){
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <TaskItem key={task._id} task={task} onComplete={this.props.onComplete}/>
                                )
                            }                                
                        })}
                        
                        {/* <div>Completed tasks</div> */}

                        {sorted.map(task => {
                            if(task.isCompleted === true){
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <TaskItem key={task._id} task={task} onComplete={this.props.onComplete}/>
                                )
                            }                                
                        })}
                    </ListGroup>
                    <br />
                    <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createTask" size="lg">Create New Task</Button>
               </Card.Body>
           </Card>
           </>
       )
      }
   }
}