import React from "react";
import axios from 'axios';
import DisplayProjectComp from "./DisplayProjectComp";
import Task from "../tasks/Task"

import EditProject from './EditProject'
import { useState, useEffect } from 'react'
import { Button, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import styles from "./Project.module.scss";


export default function DisplayProject( props ) {
    const [project, setProject] = useState();      
    const [inputs, setInputs] = useState({
        name: '',
        manager: '',
        descript:'',
        
    })
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const idToken = window.localStorage.getItem("token")
    const id = props.match.params.id;
    const [isEditing, setIsEditing] = useState(false);
    const { name, descript } = inputs;

    useEffect(() => {
        //fetchTasks();    
        getProject(props);
            
    },[])       

    const getProject = async (props) => {        
        try {
            setError(null);
            setProject(null);
            setLoading(true);
            const projectOfid = await axios.get(
                'http://localhost:8080/api/display-project/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Project useEffect -----------------`)
            console.log(projectOfid.data);
            setProject(projectOfid.data)
            setInputs({
                ...inputs,
                name: projectOfid.data.name,
                manager: projectOfid.data.manager,
                descript: projectOfid.data.descript                
            })
            
        }catch(e) {
            setError(e)
            console.log(e)
        }
        setLoading(false)
    }

    /*const fetchTasks = async () => {
        try {
            setError(null);
            setTasks(null);
            setLoading(true);
            
            const idToken = window.localStorage.getItem("token")
            const tasksOfproject = await axios.get(
                'http://localhost:8080/api/tasks-of-project/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Tasks useEffect in Project -----------------`)
            console.log(tasksOfproject.data);
            setTasks(tasks.concat(tasksOfproject.data))
            console.log("*********************")
            console.log(tasks);
            console.log("*********************")
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }*/

    const deleteProject = async (props) => {
        try {           
            const projectOfid = await axios.delete(
                'http://localhost:8080/api/delete-project/' + id, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    }
                }
            )
            history.push("/");
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const onCancel = (e) => {
        setIsEditing(!isEditing)
        setInputs({
            ...inputs,
            name: project.name,
            descript: project.descript
        })
    }

    const onEdit = (e) => {
        e.preventDefault();
        const project = {
            name: inputs.name,
            descript: inputs.descript,
            
        }
        editProject(project);
        console.log(project);
        setIsEditing(!isEditing)
        console.log(project);
        //? Without this push, data is not rendered inside DisplayProjectComp.js
        history.push("/project_list");
    }


    const editProject = async (props) => {
        try {
            
            const updatedProject = await axios.put(
                'http://localhost:8080/api/update-project/' + id,
                props,
                {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    }
                }
            )
            console.log(`from within editProject -----------------`)
            console.log(updatedProject.data);

        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }
    
    return (        
        <>
        <br />
            <Card style={{ width: "90rem" }} className={styles.card}>
                  <Card.Body>
                  {isEditing?
                        <EditProject
                        name={name}
                        descript={descript}
                        onEdit={onEdit}
                        onChange={onChange}
                        onCancel={onCancel}
                        existProject={project}
                        />
                        :
                        <>
                            <DisplayProjectComp entry={project} loading={loading} error={error} />
                            <Task />                            
                        </>  

                  } 
                    {!isEditing?
                    <span>
                          <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" href={`/createProjectTask/${id}`}>Add Task</Button> 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;   
                          <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" onClick={()=>setIsEditing(!isEditing)}>Edit Project</Button> 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;       
                          <Button  style={{ color:"#00000",background:"#FE6D73", border:"none", fontSize: 14}} size="lg" onClick={deleteProject}>Delete Project</Button>
                        </span>
                        :
                            <span>
                            </span>
                            }
                  </Card.Body>
              </Card>              
            
        </>
    )

}