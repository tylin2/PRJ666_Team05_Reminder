import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";

import styles from "./Task.module.scss";
import "bootstrap/dist/css/bootstrap.css";

import { addTask } from "./TaskServices";
import { useAuth } from "../../contexts/AuthContext.js";


export default function CreateTask() {   
    const taskNameRef = useRef();
    const dueDateRef = useRef();
    const reminderDateRef = useRef(); 
    const participantsRef = useRef(); 
    const descriptRef = useRef(); 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { currentUser } = useAuth();



    async function handleSubmit(e) {
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            addTask(taskNameRef.current.value, dueDateRef.current.value, reminderDateRef.current.value, participantsRef.current.value, descriptRef.current.value);
            history.push("/");
        } catch (e) {
            console.log(e);
        }
      

    }
    
    return (
        <>
        <div>Token: {window.localStorage.getItem("token")}</div>
        <div>UserEmail: {currentUser.email} </div>
        <br />
           <Card style={{ width: "90rem" }} className={styles.card}>
                <Card.Body>
                <h1 className="text-center">Create Task</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form
                    onSubmit={handleSubmit}
                    className="mb-3"
                    controlId="formBasicEmail"
                >
                    <Form.Group id="taskName">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Task Name</Form.Label>
                        <Form.Control type="text" ref={taskNameRef} required size="lg"/>
                    </Form.Group>
                    <br />
                    <Form.Group id="dueDate">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Due Date</Form.Label>                            
                        <Form.Control type="date" ref={dueDateRef} required />
                    </Form.Group>
                    <br />
                    <Form.Group id="reminderDate">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Reminer Date</Form.Label>
                        <Form.Control type="date" ref={reminderDateRef} required />
                    </Form.Group>
                    <br />
                    <Form.Group id="participants">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Participants</Form.Label>
                        <Form.Control type="text" ref={participantsRef} placeholder="Please provide emails and separated by ;" />
                    </Form.Group>
                    <br />
                    <Form.Group id="descript">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Descript</Form.Label>
                        <Form.Control type="text" ref={descriptRef} as="textarea"  style={{ height: '100px' }}/>
                    </Form.Group>                       
                    <br />
                    <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} size="lg" disabled={loading} type="submit">Add Task</Button>
                </Form>
                </Card.Body>
            </Card>                
        </>
    )
}