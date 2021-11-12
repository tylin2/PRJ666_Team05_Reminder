import React, { useState } from 'react'
import {  ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap';
import styles from "./Task.module.scss";
import CheckBox from '../../components/checkBox/CheckBox';
import { dark } from '@material-ui/core/styles/createPalette';

function TaskItem ({ task, onComplete, checked }) {
    const [check, setCheck] = useState(task.isCompleted)

    const onChange = (e) => {
        onComplete(e, task._id)
        setCheck(!check)
    }

    return(
        // <div className={!check?styles.taskLine:''} >            
        // <div className={check?styles.completed:styles.taskLine} >   
        // <div className={styles.taskLine} >   
        //     <CheckBox onChange={onChange} checked={check} priority={task.priority}/>
        //     <ListGroupItem   style={{fontSize: 14}} href={`task/${task._id}`} action>
        //         <span className={check?styles.completed:''}>                

        //         <span className={styles.taskNameThick} > {task.name} </span>
        //         <span>
        //         {typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}
        //         </span>
        //         </span>
        //     </ListGroupItem>
        // </div>
        <div className={styles.taskLine} >   
        <CheckBox onChange={onChange} checked={check} priority={task.priority}/>
        <ListGroupItem style={{fontSize: 14}} href={`task/${task._id}`} action>


            {/* <div className={styles.taskNameThick} > {task.name} </div>
            <div>
            {typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}
            </div> */}
            
            <div className={check?styles.completed : styles.uncompleted}>                
                <div className={styles.taskNameThick} > {task.name} </div>
                <div>
                {typeof task.dueDate === 'undefined' ? '' : task.dueDate.split('T')[0]}
                </div>
            </div>
        </ListGroupItem>
        </div>
    )

}

export default TaskItem;