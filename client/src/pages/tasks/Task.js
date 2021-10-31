import React from "react";
import TaskList2 from "./taskList2";

import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext.js";

function Tasks() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([])
    const [inputs, setInputs] = useState({
        //_id: null,
        name: '',
        user: null,
        descript:''
    })
    const [dueDate, setDueDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   

    const fetchTasks = async () => {
        try {
            setError(null);
            setTasks(null);
            setLoading(true);
            
            const idToken = window.localStorage.getItem("token")
            const userEmail = currentUser.email
            const tasksOfuser = await axios.get(
                'http://localhost:8080/api/tasks-of-user/' + userEmail, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Task useEffect -----------------`)
            console.log(tasksOfuser.data);
            setTasks(tasks.concat(tasksOfuser.data))
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    useEffect(()=>{        
        fetchTasks()
    },[]);

    return (
        <>
            <TaskList2 entries={tasks} loading={loading} error={error}/>
        </>
    )

}



export default Tasks;
