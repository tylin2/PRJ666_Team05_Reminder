import React from 'react';

import { Form, Button, Card, Alert } from "react-bootstrap";

import styles from "./user.module.scss";
import "bootstrap/dist/css/bootstrap.css";
import { auth } from "../../firebase";


function EditUser ({ existUser, userName, onEdit, onChange, onCancel }) {
    
    return(
        <>
            <h1 className="text-center">Edit User Information</h1>
            <form onSubmit={onEdit}>
                    <Form.Group id="c-u-name">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Current User Name</Form.Label>
                        {existUser?.userName}
                    </Form.Group>
                    
                    <Form.Group id="name">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">New User Name</Form.Label>
                        <input placeholder="please enter new user name"
                        name="name"
                        value={userName}
                        onChange={onChange}
                        />
                    </Form.Group>

                    <br/>
                    <br/>
                    
                    <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" >Save Changes</Button> 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button  style={{ color:"#00000",background:"#FE6D73", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" onClick={onCancel}>Cancel</Button> 
            </form>
            
        </>
            
    )
}

export default EditUser;