import React, { useState, useEffect } from 'react'
import axios from 'axios';

import FullCalendar from "@fullcalendar/react";  
import dayGridPlugin from "@fullcalendar/daygrid";  

import { useAuth } from "../../contexts/AuthContext.js";
  
export default function Calendar() {
   
    const { currentUser } = useAuth();     
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([{ title: "Today", date: new Date() }]);     
    
    /*
    let events = [
        { title: "Today", date: new Date() },
        { title: "event", date: "2021-11-03" }
    ];*/

    const fetchTasks = async () => {
        try {
            setError(null);            
            setLoading(true);
            setEvents({ title: "Today", date: new Date() });            
            
            const idToken = window.localStorage.getItem("token")
            const userEmail = currentUser.email
            const tasksOfuser = await axios.get(
                '/api//api/tasks-of-user/' + userEmail, {
                    headers: {
                      Authorization: 'Bearer ' + idToken,
                    },
                }
            )
            console.log(`from Task useEffect -----------------`)
            console.log(tasksOfuser.data);
            const tasks = tasksOfuser.data.map((task) => ({title: task.name, date:new Date(task.dueDate.split('T')), url: `task/${task._id}`}))
            //setEvents(events.push({title:tasksOfuser.data.name, date:tasksOfuser.data.dueDate }));           
            console.log(tasks);
            setEvents(events.concat(tasks));
            console.log(events);
            
        }catch(e) {
            setError(e)
        }
        setLoading(false)
    }

    useEffect(()=>{        
        fetchTasks()
    },[]);



    return (    
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={events}
      />    
  );
}  
  
