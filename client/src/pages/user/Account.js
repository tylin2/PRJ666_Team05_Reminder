import React, { useState, useEffect } from "react";
import axios from 'axios';
import firebase from 'firebase';
import { CSVLink } from "react-csv";

import { Card,ListGroup, DropdownButton,Dropdown, Button } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext.js"

import styles from "./Signup.module.scss";

export default function Account() {
    
    const onComplete = (e, id) => {
        //setCheck(e.target.checked);
        const task = {
          isCompleted: e.target.checked,
        };
        editTask(task, id);
        setTasks(
          tasks.map((task) =>
            task._id === id ? { ...task, isCompleted: e.target.checked } : task
          )
        );
      };


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