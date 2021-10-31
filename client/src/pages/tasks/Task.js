import React from "react";
import TaskList2 from "./taskList2";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import CreateTask2 from './CreateTask2'
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
        const task = {
            //_id: _id.current,
            name: inputs.name,
            user: "61511337c6d22e08280b948c",
            //user: null,
            participants: [user],
            descript: inputs.descript,
            dueDate: dueDate
        }
        //todo after fixing axios and token issue, 
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
            
            // const userLoggedIn = await axios.get(
            //     'http://localhost:8080/api/current-user/' + userEmail, {
            //         headers: {
            //           Authorization: 'Bearer ' + idToken,
            //         },
            //     }
            // )
            
            //todo
            // const response = await axios.get(
            //     'http://localhost:8080/api/list-task', {
            //         headers: {
            //           Authorization: 'Bearer ' + idToken,
            //         },
            //     }
            // )
            // console.log(response.data);
            // setTasks(tasks.concat(response.data))
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
            <CreateTask2  
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
            {/* <div>Token: {window.localStorage.getItem("token")}</div>
            <div>UserEmail: {currentUser.email} </div> */}

            <TaskList2 entries={tasks} loading={loading} error={error}/>
        </>
    )

}



export default Tasks;
