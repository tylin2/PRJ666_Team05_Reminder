import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { ListGroupItem } from 'react-bootstrap';
import styles from "./Project.module.scss";

export default function ProjectItem ( {project} ) {
    const [tasks, setTasks] = useState([]); 
    const [totalTasks, setTotalTasks] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0)

    const history = useHistory();
    const idToken = window.localStorage.getItem("token")

    useEffect(() => {            
        getTasks(project);            
    },[])

    const getTasks = async (project) => {
        setTotalTasks(0);
        setCompletedTasks(0);

        const tasksOfproject = await axios.get(
            '/api/tasks-of-project/' + project._id, {
                headers: {
                  Authorization: 'Bearer ' + idToken,
                },
            }
        )

        console.log(tasksOfproject.data);
            setTasks(tasks.concat(tasksOfproject.data))            
            setTotalTasks(Number(tasksOfproject.data.length))
            var count = 0;
            tasksOfproject.data.map(task => {
                if(task.isCompleted == true){
                    count = count+1;
                    console.log(task.name)
                    setCompletedTasks(count)                                      
                }
            }
        )


    }
        

    return(          
        <div className={styles.projectLine} >
            <ListGroupItem   style={{fontSize: 14}} href={`project/${project._id}`} action>
                <div className={styles.projectNameThick} > {project.name} </div>
                <div className={styles.completion}>
                    Completion: {Math.round(completedTasks/totalTasks*100) ?? 0}%
                </div>               
            </ListGroupItem>
        </div>
    )

}
