import React from "react";
import ProjectList from "./ProjectList";

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext.js";


export default function Projects() {
    const { currentUser } = useAuth();
    const [projects, setProjects] = useState([])   
    const idToken = window.localStorage.getItem("token") 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);   
    

    const fetchProjects = async () => {
        try {
            setError(null);
            setProjects(null);
            setLoading(true);
            
            const idToken = window.localStorage.getItem("token")
            const userEmail = currentUser.email
            const projectsOfuser = await axios.get(
                '/api/projects-of-user/' + userEmail, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Project useEffect -----------------`)
            console.log(projectsOfuser.data);
            setProjects(projects.concat(projectsOfuser.data))
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    useEffect(()=>{        
        fetchProjects()
    },[]);

    return (
        <>
            <ProjectList 
            entries={projects} 
            loading={loading} 
            error={error}
            //onChange={onChange} 
            //onComplete={onComplete}
            //checked={check}
            />            
        </>
    )

}


