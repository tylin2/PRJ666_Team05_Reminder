import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios';
import firebase from 'firebase';
import { CSVLink } from "react-csv";

import { useHistory } from "react-router-dom";

import { Card,ListGroup, DropdownButton,Dropdown, Button } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext.js"
import { updateUser } from "./UserServices";
import styles from "./Signup.module.scss";
import EditUser from "./EditUser.js";
import { constrainPoint } from "@fullcalendar/common";

import "bootstrap/dist/css/bootstrap.css";

export default function Account( props ) {

    const idToken = window.localStorage.getItem("token")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const [user, setUser] = useState([]);    
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
    })

    const { currentUser } = useAuth();
    const [isEditing, setIsEditing] = useState(true);
    const { name, email } = inputs;
    const [notificationTime, setNotificationTime] = useState('');
    const headers = [
        { label: "Subject", key: "name" },
        { label: "Start date", key: "dueDate" },
        { label: "Descript", key: "descript" }
    ];
    const [taskData, setTaskData] = useState([]);


    useEffect(() => {            
        getUser(props);                                
    },[])   
    
    const getUser = async (props) => {        
        
        try {
            setError(null);
            setLoading(true);
            setTaskData([]);       
            const userOfEmail = await axios.get(
                'http://localhost:8080/api/current-user/' + currentUser.email, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            setUser(userOfEmail.data)
            setInputs({
                ...inputs,
                name: user.userName,
                email: user.email
            })
            setNotificationTime(userOfEmail.data.notificationTime)

            const tasksOfuser = await axios.get(
                "http://localhost:8080/api/tasks-of-user/" + currentUser.email,
                {
                  headers: {
                    Authorization: "Bearer " + idToken,
                  },
                }
            );            
            var tasklist = []
            tasksOfuser.data.map(task => {
                tasklist.push({name: task.name, dueDate: `${task.dueDate.split("T")[0]}`,Descript: task.Descript})
            })
            console.log(tasklist)            
            setTaskData(taskData.concat(tasklist)) 
            
        }catch(e) {
            setError(e)
            console.log(e)
        }        
        setLoading(false)
    }

    const onEdit = (e) => {
        e.preventDefault();
        
        const user = {
            userName: inputs.name,
            notificationTime: notificationTime
        }

        editUser(user);
        console.log(user);
        setIsEditing(!isEditing);
        console.log(user);
        
        history.push("/");
    }

    const handleNotificationTimeChange = (e) => {
        setNotificationTime(e.target.value)
        console.log('notificationTime: ' + e.target.value)
    }

    const onCancel = (e) => {
        setIsEditing(!isEditing)
        setInputs({
            ...inputs,
            name: user.userName
        })
    }

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
        
    }    
    
    const editUser = async (props) => {
        try {
            
            const updatedUser = await axios.put(
                'http://localhost:8080/api/update-user/' + currentUser.email,
                props,
                {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    }
                }
            )
            
            console.log(`from within editUser -----------------`)
            console.log(updatedUser.data);

        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    return (       
        <>
        

        <Card style={{ width: "90rem" }} className={styles.accountCard}>
            {isEditing?
            <h2 className="text-center mb-4">Account Service</h2>
            :
            <></>
            }     
            <Card.Body>
            {!isEditing?
                    <EditUser
                        name={name}
                        email={email}
                        notificationTime={notificationTime}
                        onEdit={onEdit}
                        onChange={onChange}
                        onCancel={onCancel}
                        existUser={user}
                        handleNotificationTimeChange={handleNotificationTimeChange}
                    />
            :   
            
            <>
            
            
            <p >Username: {user.userName}</p> 
            <p >Email: {user.email}</p> 
                    
            <ListGroup.Item action href= "/forgotPass">Reset Password</ListGroup.Item>
                
                <ListGroup.Item>                   
                <CSVLink
                        headers={headers}
                        data={taskData}
                        filename="The_Reminder_Tasks.csv" 
                        className={styles.csvlink}                       
                    >Export Tasks to CSV for importing into Google Calendar
                </CSVLink>                    
                </ListGroup.Item>
                <ListGroup.Item onClick={()=>setIsEditing(!isEditing)}>Edit User Information</ListGroup.Item>
                <ListGroup.Item action href= "">Delete Account</ListGroup.Item>
        
            </>
                }                                
                
            </Card.Body>
        </Card>
        
        
        </>
    )

}