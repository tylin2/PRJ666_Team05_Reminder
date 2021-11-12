import React from "react";
import axios from 'axios';
import DisplayProjectComp from "./DisplayProjectComp";
import TaskItem from "../tasks/taskItem";

import { useState, useEffect } from 'react'
import { Button, Card, ListGroup } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import styles from "./Project.module.scss";

export default function DisplayProject( props ) {
    const [projects, setProjects] = useState([]);   
    const [inputs, setInputs] = useState({
        //_id: null,
        name: '',
        manager: '',
        descript:'',
        
    })
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();
    const idToken = window.localStorage.getItem("token")
    const id = props.match.params.id;


    useEffect(() => {
        getProject(props);        
    },[])       

    const getProject = async (props) => {        
        try {
            setError(null);
            setProjects([null]);
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
            setProjects(projects.concat(projectOfid.data))
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
    
    return (        
        <>
        <br />
            <Card style={{ width: "90rem" }} className={styles.card}>
                  <Card.Body>
                        <DisplayProjectComp entry={projects} loading={loading} error={error}/>
                        <span>
                          <Button  style={{ color:"#00000",background:"#0A7BC2", border:"none",paddingRight: 16, paddingLeft: 16,fontSize: 14}} size="lg" href={`/createProjectTask/${id}`}>Add Task</Button> 
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         
                          <Button  style={{ color:"#00000",background:"#74c69d", border:"none", fontSize: 14}} size="lg" onClick={"editProject"}>Edit Project</Button>
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;         
                          <Button  style={{ color:"#00000",background:"#FE6D73", border:"none", fontSize: 14}} size="lg" onClick={deleteProject}>Delete Project</Button>
                          <br />
                          <br />
                        </span>           

                        <Card>
                            <Card.Body>
                                <h2 className="text-center" >Task List</h2>
                                <ListGroup>                                
                                                                 
                                </ListGroup>

                            </Card.Body>
                        </Card>
                  </Card.Body>
              </Card>              
            
        </>
    )

}