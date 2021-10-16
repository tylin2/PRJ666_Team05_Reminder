 import React, { Component } from 'react'
 import {  ListGroup, ListGroupItem, Button } from 'react-bootstrap';

export default class TaskList extends Component  {    
    render() {
        const tasks = [
            { date: '2021-10-08', eventName: 'My Birthday' },
            { date: '2021-10-30', eventName: 'The end of study week' },
            { date: '2021-10-24', eventName: 'Start of study week' },
            { date: '2021-10-08', eventName: 'PMC115 Quiz' }
        ];
        let sorted = tasks.sort((a, b) =>
            a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
        return (
            <>
                <h1 style={{fontSize: 28}}>Task List</h1>
                <ListGroup>
                    {sorted.map(task => (
                        <ListGroupItem  style={{fontSize: 14}} href="task/:id" action>{task.date}   {task.eventName}  </ListGroupItem>
                    ))}
                </ListGroup>
                <br />
                <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} href="/task" size="lg">Create New Task</Button>
            </>
        )
    }
}