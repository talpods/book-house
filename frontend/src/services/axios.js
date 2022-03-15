import axios from 'axios';
const userData = JSON.parse(localStorage.getItem('userData')) || null;

// Next we make an 'instance' of it
const instance = axios.create();

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['Authorization'] = `Bearer ${userData?.token}`;

export default instance;
