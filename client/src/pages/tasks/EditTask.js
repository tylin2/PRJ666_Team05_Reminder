//Todo: 
////      1. input들 만들기 
////      2.props 받아오기 (destructured values, methods(onChange, onCreate))
////       put onCreate on onSubmit property.


import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
  } from '@material-ui/pickers';

import { Form, Button, Card, Alert } from "react-bootstrap";

import styles from "./Task.module.scss";
import "bootstrap/dist/css/bootstrap.css";

function EditTask ({ priority, name, descript, dueDate, onEdit, onChange, onCancel, handleDateChange, handlePriorityChange }) {
    return(
        <>
            <h1 className="text-center">Edit Task</h1>
            <form onSubmit={onEdit}>
                    <Form.Group id="name">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Task Name</Form.Label>
                        <input placeholder="title"
                        name="name"
                        value={name}
                        //defaultValue={existingTask.name}
                        onChange={onChange}
                        required
                        />
                    </Form.Group>
                    
                    <Form.Group id="descript">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Description</Form.Label>
                        <textarea placeholder="description"
                            name="descript"
                            value={descript}
                            //defaultValue={existingTask.descript}
                            onChange={onChange}
                        />
                    </Form.Group>
                    
                    <Form.Group id="dueDate">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Due Date</Form.Label>  
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                                id="time-picker"
                                //label="Time picker"
                                value={dueDate}
                                //defaultValue={existingTask.dueDate}
                                onChange={handleDateChange}
                        />
                        </MuiPickersUtilsProvider>
                    </Form.Group> 

                    <Form.Group id="priority">
                        <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Priority</Form.Label>                        
                        <select name="priority" value={priority} onChange={handlePriorityChange}>
                            <option value="P1">Priority 1</option>
                            <option value="P2">Priority 2</option>
                            <option value="P3">Priority 3</option>
                            <option value="P4">Priority 4</option>
                        </select>
                    </Form.Group> 
                    
                    <br />
                    <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" >Save</Button> 
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button  style={{ color:"#00000",background:"#FE6D73", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" onClick={onCancel}>Cancel</Button> 
            </form>
        </>





        // <Card style={{ width: "90rem" }} className={styles.card}>
        //     <Card.Body>
        //     <h1 className="text-center">Create Task</h1>
        //     <form onSubmit={onEdit}>
        //             <Form.Group id="name">
        //                 <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Task Name</Form.Label>
        //                 <input placeholder="title"
        //                 name="name"
        //                 value={name}
        //                 onChange={onChange}
        //                 required
        //                 />
        //             </Form.Group>
                    
        //             <Form.Group id="descript">
        //                 <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Description</Form.Label>
        //                 <textarea placeholder="description"
        //                     name="descript"
        //                     value={descript}
        //                     onChange={onChange}
        //                 />
        //             </Form.Group>
                    
        //             <Form.Group id="dueDate">
        //                 <Form.Label class="col-sm-2 col-form-label col-form-label-lg">Due Date</Form.Label>  
        //                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //                 <KeyboardDateTimePicker
        //                         id="time-picker"
        //                         //label="Time picker"
        //                         value={dueDate}
        //                         onChange={handleDateChange}
        //                 />
        //                 </MuiPickersUtilsProvider>
        //             </Form.Group> 
                    
        //             <br />
        //             <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} size="lg">Create New Task</Button>
        //     </form>

        //     </Card.Body>
            

        // </Card> 
        
    )
}

export default EditTask;
