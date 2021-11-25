import React, { useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import styles from "./Task.module.scss";
import CheckBox from "../../components/checkBox/CheckBox";
import { RiDeleteBin6Line } from "react-icons/ri";
import { dark } from "@material-ui/core/styles/createPalette";
import { BsAlarm } from "react-icons/bs";

function TaskItem({ task, onComplete, onDelete, checked }) {
  const [check, setCheck] = useState(task.isCompleted);

  const onChange = (e) => {
    onComplete(e, task._id);
    setCheck(!check);
  };

  const onClick = (e) => {
    e.preventDefault();
    onDelete(e, task._id);
  };

  return (
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
    <div className={styles.taskLine}>
      <CheckBox onChange={onChange} checked={check} priority={task.priority} />
      <ListGroupItem style={{ fontSize: 14 }} href={`task/${task._id}`} action>
        <div className={check ? styles.completed : styles.uncompleted}>
          <div className={styles.taskNameThick}> {task.name} </div>
          {task.notification&&<BsAlarm className={styles.alarmIcon}/>}          
          <div>
            {typeof task.dueDate === "undefined"
              ? ""
              : task.dueDate.split("T")[0]}
            {/* {typeof task.dueDate === "undefined" ? "" : task.dueDate} */}
          </div>
          <RiDeleteBin6Line onClick={onClick} className={styles.disalbed} />
        </div>
      </ListGroupItem>
    </div>
  );
}

export default TaskItem;
