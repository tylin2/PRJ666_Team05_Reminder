import axios from 'axios';
import firebase from 'firebase';

const addURL = 'http://localhost:8080/api/create-task';

export const addTask = (name, dueDate, remindDate, participants, descript) => {
  const idToken = window.localStorage.getItem("token")
    const user = firebase.auth().currentUser.email;
    const payload = {
        name, 
        dueDate, 
        remindDate,
        user, 
        participants, 
        descript
    }
    try {
      console.log(payload);    
      // const res = axios.post(url, payload, header);
      const res = axios.post(addURL, payload, {
        headers: {
          Authorization: 'Bearer ' + idToken
        }});
      console.log(res);
      return res.data;
    } catch (e) {
      console.error(e);
    }
};

export const fetchTasks = async () => {
  const idToken = window.localStorage.getItem("token")

  try {
    const res = await axios.get('http://localhost:8080/api/list-task', {
      headers: {
        Authorization: 'Bearer ' + idToken,
      },
  });
    return res.data;
  } catch (e) {
    console.error(e);
  }
}


