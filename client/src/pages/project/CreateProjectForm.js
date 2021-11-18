import React from 'react';
import { Form, Button, Card } from "react-bootstrap";

import styles from "./Project.module.scss";
import "bootstrap/dist/css/bootstrap.css";


export default function CreateProjectFrom({ name, manager, descript, onCreate, onChange, handleDateChange }) {
    return(        
        <Card style={{ width: "90rem" }} className={styles.card}>
            <Card.Body>
            <h1 className="text-center">Create Project</h1>
            <form onSubmit={onCreate}>
                    <Form.Group id="name">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Project Name</Form.Label>
                        <input placeholder="title"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                        />
                    </Form.Group>

                    <Form.Group id="manager">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Manager</Form.Label>
                        <input placeholder="manager"
                        name="manager"
                        value={manager}
                        onChange={onChange}                        
                        />
                    </Form.Group>
                    
                    <Form.Group id="descript">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Description</Form.Label>
                        <textarea placeholder="description"
                            name="descript"
                            value={descript}
                            onChange={onChange}
                        />
                    </Form.Group>                   
                    
                    <br />
                    <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} size="lg">Create New Project</Button>
            </form>

            </Card.Body>
            

        </Card> 
        
    )
}
