import React from "react";
import axios from 'axios';
import firebase from 'firebase';
import DisplayTaskComp from "./DisplayTaskComp";

import { useState, useEffect } from 'react'

import { useAuth } from "../../contexts/AuthContext.js"

export default function DisplayTask() {
    const { currentUser } = useAuth();
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getTask = async () => {
        try {
            setError(null);
            setTask(null);
            setLoading(true);
            
            const user = firebase.auth().currentUser;
            const token = user && (await user.getIdToken());
            const id = DisplayTaskComp.getTaskId();
            console.log(id)
            const taskOfid = await axios.get(
                'http://localhost:8080/api/display-task/' + id, {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log(`from Task useEffect -----------------`)
            console.log(taskOfid.data);
            setTask(task.concat(taskOfid.data))
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }
    
    return (
        <>
            <DisplayTaskComp entry={task} loading={loading} error={error}/>
        </>
    )

}