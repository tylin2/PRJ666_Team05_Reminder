import React from "react";
import axios from 'axios';
import firebase from 'firebase';
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
    //todo think about how to set input values out of a particular task.
    const [inputs, setInputs] = useState({
        //_id: null,
        name: '',
        user: null,
        descript:''
    })
    const [dueDate, setDueDate] = useState(new Date());
    const { name, user, descript } = inputs;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const idToken = window.localStorage.getItem("token")
    const id = props.match.params.id;
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        getTask(props); // <-- pass the component props
    },[])   

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
        setIsEditing(!isEditing) //? Should I consider using useCallback?
    }
    //todo
    const onEdit = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing) //? Should I consider using useCallback?
        // const userEmail = currentUser.email
        // const task = {
        //     //_id: _id.current,
        //     name: inputs.name,
        //     user: userEmail,
        //     //user: null,
        //     participants: [user],
        //     descript: inputs.descript,
        //     dueDate: dueDate
        // }
        // //todo after fixing axios and token issue, 
        // editTask(task);

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
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }
    
    //todo 
    const editTask = async (task) => {

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
            history.push("/");          //!<-----              
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
                        // <div>Hi!</div>
                        <EditTask
                        name={tasks[0].name}
                        descript={tasks[0].descript}
                        dueDate={dueDate}
                        onEdit={onEdit}
                        onChange={onChange}
                        handleDateChange={handleDateChange}
                        onCancel={onCancel}
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