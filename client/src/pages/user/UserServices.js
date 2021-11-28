import axios from 'axios';
import firebase from 'firebase';

const url = 'http://localhost:8080/api/create-or-update-user';

const createToken = async () => {
    const user = firebase.auth().currentUser;
    const token = user && (await user.getIdToken());
  
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
  }

export const addToUser = (email, userName,password) => {
  //const header = createToken();
  //console.log(header);
  const payload = {
    email,
    userName,
    password
  }
  try {
    console.log(payload);    
    // const res = axios.post(url, payload, header);
    const res = axios.post(url, payload);
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = (email, userName) => {
  //const header = createToken();
  //console.log(header);
  const payload = {
    email,
    userName
  }
  try {
    console.log(payload);    
    // const res = axios.post(url, payload, header);
    const res = axios.put(url, payload);
    console.log(res);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
