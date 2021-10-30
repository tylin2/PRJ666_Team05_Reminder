import React from "react";
import TaskList from "./taskList";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import CreateTask from './CreateTask'

function Tasks() {
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




    /*
    export const addToUser = (email, userName,password) => {
    //const header = createToken();
    //console.log(header);
    const payload = {
      email,
      userName,
      password
    }
    try {
      console.log(payload);    
      // const res = axios.post(url, payload, header);
      const res = axios.post(url, payload);
      console.log(res);
      return res.data;
    } catch (e) {
      console.error(e);
    }
    };
    */
    const addNewTask = async (task) => {
        try {
            console.log('task to be added: '+task.user)
            const response = await axios.post(
                'http://localhost:8080/api/create-task',
                task
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
        const task = {
            //_id: _id.current,
            name: inputs.name,
            user: "61511337c6d22e08280b948c",
            participants: [user],
            descript: inputs.descript,
            dueDate: dueDate
        }

        addNewTask(task);

        //I think I can just post the new one 

        // setTasks([...tasks, addedTask])

        // setInputs({
        //     name: '',
        //     user: null,
        //     descript:''
        // })

        //_id.current += 1;
    }

    const fetchTasks = async () => {
        try {
            setError(null);
            setTasks(null);
            setLoading(true);
            const response = await axios.get(
                'http://localhost:8080/api/list-task'
            )
            console.log(response.data);
            //setTasks([... tasks, response.data])
            setTasks(tasks.concat(response.data))
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
            <CreateTask  
                name={name}
                descript={descript}
                dueDate={dueDate}
                onCreate={onCreate}
                onChange={onChange}
                handleDateChange={handleDateChange}
            />
            <div>
                {name}: {descript}: {dueDate.toISOString().split('T')[0]}
            </div>
            <TaskList entries={tasks} loading={loading} error={error}/>
        </>
    )

}



export default Tasks;