import React from 'react';

import { Form, Button, Card, Alert } from "react-bootstrap";

import styles from "./Project.module.scss";
import "bootstrap/dist/css/bootstrap.css";

function EditProject ({ existingProject, name, descript, onEdit, onChange, onCancel }) {
    return(
        <>
            <h1 className="text-center">Edit Project</h1>
            <form onSubmit={onEdit}>
                    <Form.Group id="name">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Project Name</Form.Label>
                        <input placeholder="title"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
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
                    <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" >Save</Button> 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button  style={{ color:"#00000",background:"#FE6D73", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" onClick={onCancel}>Cancel</Button> 
            </form>
        </>

        
    )
}

export default EditProject;