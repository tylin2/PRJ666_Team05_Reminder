import React from "react";

import { useState, useRef } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext.js";
import CreateTask2 from '../tasks/CreateTask2';

export default function CreateProTask( props ) {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([])
    const [inputs, setInputs] = useState({        
        name: '',
        user: null,
        descript:''
    })
    const [dueDate, setDueDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { name, user, descript } = inputs;
    const _id = useRef(1);

    const history = useHistory();

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
            history.push("/");  
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
            participants: [user],
            descript: inputs.descript,
            dueDate: dueDate,
            project: props.match.params.id
        }
        //todo after fixing axios and token issue, 
        addNewTask(task);
        
    }

    return (
        <>
            <br />
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