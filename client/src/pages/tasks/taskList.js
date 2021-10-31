 import React, { Component, useEffect } from 'react'
 import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';

 import styles from "./Task.module.scss";
 import "bootstrap/dist/css/bootstrap.css";

 import { fetchTasks } from './TaskServices';

export default class TaskList extends Component  {    
    render() {
        {/*const tasks = [
            { date: '2021-10-08', eventName: 'My Birthday' },
            { date: '2021-10-30', eventName: 'The end of study week' },
            { date: '2021-10-24', eventName: 'Start of study week' },
            { date: '2021-10-08', eventName: 'PMC115 Quiz' }
        ];
        let sorted = tasks.sort((a, b) =>
            a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
        */}
       
        if(this.props.loading) {return <div>on loading..</div>}
        else if(this.props.error) {return <div>error occured</div>}
        else if(this.props) {
            return <>
                <Card style={{ width: "90rem" }} className={styles.card}>
                    <Card.Body>
                        <h1 className="text-center">Task List</h1>
                        <br />
                        <h2> No Task</h2>
                        <br /> 
                        <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createTask" size="lg">Create New Task</Button>
                    </Card.Body>
                </Card>                
            </>
        }
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
            <br />
                <Card style={{ width: "90rem" }} className={styles.card}>
                    <Card.Body>
                        <h1 className="text-center">Task List</h1>
                        <ListGroup>
                            {/*{sorted.map(task => (
                                <ListGroupItem  style={{fontSize: 14}} href="task/:id" action>{task.date}   {task.eventName}  </ListGroupItem>
                            ))}*/}
                             {sorted.map(task => {
                                if(typeof task.dueDate === 'object') task.dueDate.toISOString()
                                return(
                                    <ListGroupItem key={task._id} style={{fontSize: 14}} href="task/:id" action>{task.name}|{typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}</ListGroupItem>
                                )
                            })}
                        </ListGroup>
                        <br />
                        <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/createTask" size="lg">Create New Task</Button>
                    </Card.Body>
                </Card>                
                
                <br />
                
            </>
        )}
    }
}