import React from "react";

import { useState, useRef } from 'react'
import axios from 'axios';
import CreateTask2 from './CreateTask2'
import { useAuth } from "../../contexts/AuthContext.js";

export default function CreateTask() {
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

    const { name, user, descript } = inputs;
    const _id = useRef(1);

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

    const addNewTask = async (task) => {
        try {
            //console.log('task to be added: '+task.user)
            const idToken = window.localStorage.getItem("token")
            const userEmail = currentUser.email

            const response = await axios.post(
                'http://localhost:8080/api/create-task/' + userEmail,
                task,
                {
                 
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`addNewTask's response: ${response.data._id}`);



            setTasks([...tasks, response.data])

            setInputs({
                name: '',
                user: null,
                descript:''
            })
        }catch (e) {
            console.error(e);
        }
    }

    const onCreate = (e) => {
        e.preventDefault();
        const userEmail = currentUser.email
        const task = {
            //_id: _id.current,
            name: inputs.name,
            user: userEmail,
            //user: null,
            participants: [user],
            descript: inputs.descript,
            dueDate: dueDate
        }
        //todo after fixing axios and token issue, 
        addNewTask(task);
        
    }

    return (
        <>
            <CreateTask2  
                name={name}
                descript={descript}
                dueDate={dueDate}
                onCreate={onCreate}
                onChange={onChange}
                handleDateChange={handleDateChange}
            />
            
        </>
    );
}
