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
import Button from 'react-bootstrap/Button';

function CreateTask({ name, descript, dueDate, onCreate, onChange, handleDateChange }) {
    return(
        <div>
            <form onSubmit={onCreate}>
                <input placeholder="title"
                    name="name"
                    value={name}
                    onChange={onChange}
                />
                <textarea placeholder="description"
                    name="descript"
                    value={descript}
                    onChange={onChange}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                        id="time-picker"
                        //label="Time picker"
                        value={dueDate}
                        onChange={handleDateChange}
                />
                </MuiPickersUtilsProvider>
                <br />
                <Button type="submit" style={{ color:"#00000",background:"#0A7BC2", border:"none",fontSize: 14}} size="lg">Create New Task</Button>
            </form>
        </div>
    )
}

export default CreateTask;
