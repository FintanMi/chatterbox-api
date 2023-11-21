import axios from 'axios';

// axios.defaults.baseURL = 'https://chatterbox-app-371a8887d852.herokuapp.com/'
axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();