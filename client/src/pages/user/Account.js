import React from "react";
import axios from 'axios';
import firebase from 'firebase';

import { Card,ListGroup, DropdownButton,Dropdown } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext.js"

import styles from "./Signup.module.scss";

export default function Account() {
    return (
        <>
        <br />
        <Card style={{ width: "90rem" }} className={styles.accountCard}>
            <h2 className="text-center mb-4">Account</h2>
            <Card.Body>
                <h5>Account Service</h5>                
                <ListGroup.Item action href= "/forgotPass">Reset Password</ListGroup.Item>
                <ListGroup.Item>
                    Set Notification Time                    
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/action-1">06:00</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">12:00</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">21:00</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">00:00</Dropdown.Item>
                    </DropdownButton>                                                       
                   
                </ListGroup.Item>
            </Card.Body>
        </Card>
        </>
    )

}