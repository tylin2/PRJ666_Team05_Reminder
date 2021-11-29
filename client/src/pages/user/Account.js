import React, { useState, useEffect } from "react";
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
    const { name, email, password } = inputs;

    useEffect(() => {            
        getUser(props);            
    },[])   
    
    const getUser = async (props) => {        
        
        try {
            setError(null);
            setLoading(true);
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
                email: user.email,
                password: user.password
            })
            
        }catch(e) {
            setError(e)
            console.log(e)
        }
        setLoading(false)
    }

    const onEdit = (e) => {
        e.preventDefault();
        
        const user = {
            userName: inputs.name
        }

        editUser(user);
        console.log(user);
        setIsEditing(!isEditing);
        console.log(user);
        
        history.push("/");
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
                        onEdit={onEdit}
                        onChange={onChange}
                        onCancel={onCancel}
                        existUser={user}
                        />
            :   
            
            <>
            
            
            <p >Username: {user.userName}</p> 
            <p >Email: {user.email}</p> 
                    
            <ListGroup.Item action href= "/forgotPass">Reset Password</ListGroup.Item>
                <ListGroup.Item>
                    Set Notification Time                    
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button" onSelect={"6"}>
                        <Dropdown.Item eventKey="6">06:00</Dropdown.Item>
                        <Dropdown.Item eventKey="12">12:00</Dropdown.Item>
                        <Dropdown.Item eventKey="21">21:00</Dropdown.Item>
                        <Dropdown.Item eventKey="0">00:00</Dropdown.Item>
                    </DropdownButton>
                </ListGroup.Item>
                <ListGroup.Item>
                    Export Tasks to CSV
                </ListGroup.Item>
                <ListGroup.Item onClick={()=>setIsEditing(!isEditing)}>Edit User Information</ListGroup.Item>
                <ListGroup.Item action href= "">Delete Account</ListGroup.Item>
        
            </>
                }                                
                
            </Card.Body>
        </Card>
        
        }
        </>
    )

}