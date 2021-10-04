 import React, { Component } from 'react'
 import {  ListGroup, ListGroupItem, Button } from 'react-bootstrap';

export default class TaskList extends Component {    
    render() {
        const tasks = [
            { date: '2021-10-08', eventName: 'My Birtheday' },
            { date: '2021-10-30', eventName: 'The end of study week' },
            { date: '2021-10-24', eventName: 'Start of study week' },
            { date: '2021-10-08', eventName: 'PMC115 Quiz' }
        ];
        let sorted = tasks.sort((a, b) =>
            a.date.split('-').reverse().join().localeCompare(b.date.split('-').reverse().join()));
        return (
            <>
                <h2>Task List</h2>
                <ListGroup>
                    {sorted.map(task => (
                        <ListGroupItem href="task/:id">{task.date}  {task.eventName}</ListGroupItem>
                    ))}
                </ListGroup>
                <Button href="#">Create New Task</Button>
            </>
        )
    }
}