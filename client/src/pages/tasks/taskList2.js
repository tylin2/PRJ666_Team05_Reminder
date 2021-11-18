import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Task.module.scss";
import TaskItem from './taskItem';
import { BiSortDown } from 'react-icons/bi';

/**
 * Todo: 
 * 1. put different colors on each priority 
 * 2. Sort by priority
 * ! how? each task is distinguished by its priority. --> conditional render. 
 */
export default class TaskList2 extends Component  {    
   render() {
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else {
        let tasks = this.props.entries;
        //? sort by selected rule <--- can be implemented by if else statements so that we can avoid duplicating sorting process.
        //priority sort
        if(this.props.isPrioritySorted){
            let sortedByPriority = tasks.sort((a,b)=>{
                let retVal=0;
                if(a.priority > b.priority) {
                    retVal = 1;
                }else if(a.priority < b.priority){
                    retVal = -1;
                }else { //a.priority == b.priority
                    retVal = 0;
                }
                return retVal;
            })
        }else {
            //default sort rule: sort by dueDate.
            let sorted = tasks.sort((a, b) =>{
                //if(typeof a.dueDate === 'Date')
                if(typeof a.dueDate !== 'string') a.dueDate.toISOString()
                if(typeof b.dueDate !== 'string') b.dueDate.toISOString()
                return a.dueDate.split('T')[0].split('-').reverse().join().localeCompare(b.dueDate.split('T')[0].split('-').reverse().join())
                }
            );
        }
        
       return (
           <>
           <br />
           <Card style={{ width: "90rem" }} className={styles.card}>
               <Card.Body>
                    {/* <h1 className="text-center" style={{color: 'black'}}>Task List</h1> */}
                    <h1 className="text-center" >Task List</h1>
                    <BiSortDown style = {{}}className={styles.sortIcon} onClick={this.props.onPrioritySorted} />
                    <h4>Check for finishing</h4>
                    <ListGroup>
                       
                        {tasks.map(task => {
                            if(task.isCompleted === false){
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <TaskItem key={task._id} task={task} onComplete={this.props.onComplete}/>
                                )
                            }                                
                        })}
                        {/* {sorted.map(task => {
                            if(task.isCompleted === false){
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <TaskItem key={task._id} task={task} onComplete={this.props.onComplete}/>
                                )
                            }                                
                        })} */}
                        
                        {/* <div>Completed tasks</div> */}

                        {tasks.map(task => {
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