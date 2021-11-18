import React from "react";

import { useState, useRef } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext.js";

import CreateProjectFrom from "./CreateProjectForm.js";

export default function CreateProject() {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([])
    const [inputs, setInputs] = useState({        
        name: '',
        manager: null,
        descript:''
    })    

    const { name, manager, descript } = inputs;
    const _id = useRef(1);

    const history = useHistory();
    
    const onChange = e => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const addNewProject = async (project) => {
        try {            
            const idToken = window.localStorage.getItem("token")
            const userEmail = currentUser.email

            const response = await axios.post(
                'http://localhost:8080/api/create-project/' + userEmail,
                project,
                {
                 
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`addNewProject's response: ${response.data._id}`);



            setProjects([...projects, response.data])

            setInputs({
                name: '',
                manager: null,
                descript:'',
                createBy:''
            })
            history.push("/");  
        }catch (e) {
            console.error(e);
        }
    }

    const onCreate = (e) => {
        e.preventDefault();
        const userEmail = currentUser.email
        const project = {            
            name: inputs.name,
            manager: inputs.manager,
            descript: inputs.descript,
            createBy: userEmail            
        }
        //todo after fixing axios and token issue, 
        addNewProject(project);
        
    }

    return (
        <>
            <br />
             <CreateProjectFrom  
                name={name}
                manager={manager}
                descript={descript}
                onCreate={onCreate}
                onChange={onChange}               
            />
            
            
        </>
    );
}
