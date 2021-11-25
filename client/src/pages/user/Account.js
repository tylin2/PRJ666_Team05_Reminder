import React, { useState, useEffect } from "react";
import axios from 'axios';
import firebase from 'firebase';
import { CSVLink } from "react-csv";

import { Card,ListGroup, DropdownButton,Dropdown, Button } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext.js"

import styles from "./Signup.module.scss";

export default function Account() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [headers, setHeaders] = useState([]);
    const idToken = window.localStorage.getItem("token");
    const [error, setError] = useState(null);    

    /*const download = () => {
        try{
            setError(null);
            setTasks(null);
            setHeaders(null);
            const idToken = window.localStorage.getItem("token");
            const userEmail = currentUser.email;
            const tasksOfuser = axios.get(
            "http://localhost:8080/api/tasks-of-user/" + userEmail,
            {
                headers: {
                Authorization: "Bearer " + idToken,
                },
            }
            );
            console.log(tasksOfuser.data);
            const headers = [
                { label: "Subject", key: "name" },
                { label: "Start date", key: "dueDate" },
                { label: "Start time", key: "dueDate" },
                { label: "Descript", key: "descript" }
            ];
            setTasks(tasks.concat(tasksOfuser.data));
            setHeaders(headers.concat())

                
        }
        catch (e){
            setError(e);
        }
    };

    const csvReport = {
        data: tasks,
        headers: headers,
        filename: 'The_Reminder_Report.csv'
    };

    useEffect(() => {
        download();
      }, []);
    */

    return (
        <>
        <br />
        <Card style={{ width: "90rem" }} className={styles.accountCard}>
            <h2 className="text-center mb-4">Account Service</h2>
            <Card.Body>                                
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
                <ListGroup.Item action href= "">Delete Account</ListGroup.Item>
            </Card.Body>
        </Card>
        </>
    )

}