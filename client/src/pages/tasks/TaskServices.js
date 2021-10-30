import axios from 'axios';
import firebase from 'firebase';

const addURL = 'http://localhost:8080/api/create-task';

export const addTask = (taskName, dueDate, reminderDate, participants, descript) => {
    const userEmail = firebase.auth().currentUser.email;
    const payload = {
        taskName, 
        dueDate, 
        reminderDate,
        userEmail, 
        participants, 
        descript
    }
    try {
      console.log(payload);    
      // const res = axios.post(url, payload, header);
      const res = axios.post(addURL, payload);
      console.log(res);
      return res.data;
    } catch (e) {
      console.error(e);
    }
};
  