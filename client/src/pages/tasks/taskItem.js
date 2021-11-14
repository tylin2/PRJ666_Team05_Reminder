import React, { useState } from 'react'
import {  ListGroupItem } from 'react-bootstrap';
import styles from "./Task.module.scss";
import CheckBox from '../../components/checkBox/CheckBox';

function TaskItem ({ task, onComplete, checked }) {
    const [check, setCheck] = useState(task.isCompleted)

    const onChange = (e) => {
        onComplete(e, task._id)
        setCheck(!check)
    }

    return(
        // <div className={!check?styles.taskLine:''} >            
        // <div className={check?styles.completed:styles.taskLine} >   
        <div className={styles.taskLine} >   
            <CheckBox onChange={onChange} checked={check}/>
            <ListGroupItem   style={{fontSize: 14}} href={`task/${task._id}`} action>
                <span className={check?styles.completed:''}>                
                {typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}     {task.name}
                </span>
            </ListGroupItem>
        </div>
    )

}

export default TaskItem;