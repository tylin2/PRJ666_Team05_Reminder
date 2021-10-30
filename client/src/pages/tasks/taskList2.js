import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Task.module.scss";

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
           <Card style={{ width: "90rem" }} className={styles.card}>
               <Card.Body>
                    <h1 style={{fontSize: 28}}>Task List</h1>
                    <ListGroup>
                        {/* {sorted.map(task => (

                            <div>
                                <ListGroupItem  style={{fontSize: 14}} href="task/:id" action>{task.name}|{typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}</ListGroupItem>
                        </div>
                        ))} */}
                        {sorted.map(task => {
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <div>
                                        <ListGroupItem key={task._id} style={{fontSize: 14}} href="task/:id" action>{task.name}|{typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}</ListGroupItem>
                                    </div>
                                )
                            })}
                    </ListGroup>
               </Card.Body>
           </Card>

           </>
       )
      }
   }
}