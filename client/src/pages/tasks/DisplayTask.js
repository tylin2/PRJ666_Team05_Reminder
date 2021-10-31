import React from "react";
import axios from 'axios';
import firebase from 'firebase';
import DisplayTaskComp from "./DisplayTaskComp";

import { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import styles from "./Task.module.scss";

import { useAuth } from "../../contexts/AuthContext.js"

export default function DisplayTask( props ) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    useEffect(() => {
        getTask(props); // <-- pass the component props
    },[])   

    const getTask = async (props) => {        
        try {
            setError(null);
            setTasks([null]);
            setLoading(true);                       
           
            const idToken = window.localStorage.getItem("token")
            const id = props.match.params.id;            
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
    
    const deleteTask = async (props) => {
        try { 
            const idToken = window.localStorage.getItem("token")
            const id = props.match.params.id;            
            const taskOfid = await axios.delete(
                'http://localhost:8080/api/delete-task/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    }
                }
            )
                        
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
                        <DisplayTaskComp entry={tasks} loading={loading} error={error}/>
                        <span>
                          <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg">Edit Task</Button> 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         
                          <Button  style={{ color:"#00000",background:"#FE6D73", border:"none", fontSize: 14}} size="lg" onClick={deleteTask}>Delete Task</Button>
                        </span>
                  </Card.Body>
              </Card>              
            
        </>
    )

}