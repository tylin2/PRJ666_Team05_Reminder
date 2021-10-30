import React, { Component } from 'react'
import {  ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";

export default class TaskList extends Component  {    
   render() {
      if(this.props.loading) {return <div>on loading..</div>}
      else if(this.props.error) {return <div>error occured</div>}
      else if(this.props) {return <>
                                <br /> 
                                <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createTask" size="lg">Create New Task</Button>
                            </>}
      else {
        let tasks = this.props.entries;
        let sorted = tasks.sort((a, b) =>{
            //if(typeof a.dueDate === 'Date')
            if(typeof a.dueDate !== 'string') 
                a.dueDate.toISOString()
            if(typeof b.dueDate !== 'string') 
                b.dueDate.toISOString()
            return a.dueDate.split('T')[0].split('-').reverse().join().localeCompare(b.dueDate.split('T')[0].split('-').reverse().join());
        });
       return (
           <>
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
               <br />
                <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/creatTask" size="lg">Create New Task</Button>
           </>
       )
      }
   }
}