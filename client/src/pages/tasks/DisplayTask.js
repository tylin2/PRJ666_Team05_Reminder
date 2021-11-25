import React from "react";
import axios from 'axios';
import DisplayTaskComp from "./DisplayTaskComp";
import EditTask from './EditTask'
import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import styles from "./Task.module.scss";

import { useAuth } from "../../contexts/AuthContext.js"

export default function DisplayTask( props ) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [inputs, setInputs] = useState({
        //_id: null,
        name: '',
        user: null,
        descript:''
    })
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [notification, setNotification] = useState(true);
    const { name, user, descript } = inputs;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const idToken = window.localStorage.getItem("token")
    const id = props.match.params.id;
    const [isEditing, setIsEditing] = useState(false);
    // //it is just a dependency.
    //const [editCompleted, setEditCompleted] = useState(false);


    useEffect(() => {
        getTask(props); // <-- pass the component props
    },[])   

    const handleNotification = (e) => {
        console.log(notification);
        setNotification(e.target.checked);
      };
    const handlePriorityChange = (e) => {
        setPriority(e.target.value)
        console.log('Priority: ' + e.target.value)
    }
    const handleDateChange = (date) => {
        console.log(date);
        setDueDate(date);
    };
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onCancel = (e) => {
        setIsEditing(!isEditing)
        setInputs({
            ...inputs,
            name: tasks[0].name,
            descript: tasks[0].descript
        })
        setDueDate(tasks[0].dueDate)
    }
    
    const onEdit = (e) => {
        e.preventDefault();
        
        const task = {
            name: inputs.name,
            descript: inputs.descript,
            dueDate: dueDate,
            priority: priority,
            notification: notification
        }
        
        editTask(task);
        console.log("```````````````````in onEdit````````````````````")
        console.log(tasks);
        
        setIsEditing(!isEditing)
        console.log(tasks);
        //setEditCompleted(!editCompleted)

        //? Without this push, data is not rendered inside DisplayTaskComp.js
        history.push("/task_list");
    }

     
    const editTask = async (task) => {
        try {
            setError(null);
            setTasks([null]);
            setLoading(true);
            const updatedTask = await axios.put(
                'http://localhost:8080/api/update-task/' + id, 
                task,
                {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from within editTask -----------------`)
            console.log(updatedTask.data);

        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    const getTask = async (props) => {        
        try {
            setError(null);
            setTasks([null]);
            setLoading(true);
            const taskOfid = await axios.get(
                'http://localhost:8080/api/display-task/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Task useEffect -----------------`)
            console.log(taskOfid.data);
            setTasks(tasks.concat(taskOfid.data))
            setInputs({
                ...inputs,
                name: taskOfid.data.name,
                descript: taskOfid.data.descript
            })
            // console.log(`from Task useEffect --------AGAIN---------`)
            // console.log(tasks[0])
            setDueDate(taskOfid.data.dueDate)
            setPriority(taskOfid.data.priority)
            setNotification(taskOfid.data.notification)
        }catch(e) {
            setError(e)
            console.log(e)
        }
        setLoading(false)
    }

    const deleteTask = async (props) => {
        try {           
            const taskOfid = await axios.delete(
                'http://localhost:8080/api/delete-task/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    }
                }
            )
            history.push("/");
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }
    
    return (        
        <>
        <br />
            <Card style={{ width: "90rem" }} className={styles.card}>
                  <Card.Body>
                      {isEditing?
                        <EditTask
                        name={name}
                        descript={descript}
                        dueDate={dueDate}
                        priority={priority}
                        notification={notification}
                        onEdit={onEdit}
                        onChange={onChange}
                        handleDateChange={handleDateChange}
                        handlePriorityChange={handlePriorityChange}
                        onCancel={onCancel}
                        existingTask={tasks[0]}
                        handleNotification={handleNotification}
                        />
                        :
                        <DisplayTaskComp entry={tasks} loading={loading} error={error}/>
                       }
                        <span>
                            {!isEditing?
                            <span>
                            <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" onClick={()=>setIsEditing(!isEditing)}>Edit Task</Button> 
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         
                            <Button  style={{ color:"#00000",background:"#FE6D73", border:"none", fontSize: 14}} size="lg" onClick={deleteTask}>Delete Task</Button>
                            </span>
                            :
                            <span>
                            </span>
                            }
                          
                          
                        </span>
                  </Card.Body>
              </Card>              
            
        </>
    )

}