import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8889',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  withCredentials: true,
  timeout: 60000
});

server.interceptors.request.use(config => {
  return config;
});
server.interceptors.response.use(res => {
  console.log(res);
  return res;
});

export default server;
