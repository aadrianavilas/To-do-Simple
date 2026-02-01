import axios from "axios";
const taskApi = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

//export const getAllTask = () => taskApi.get("/");

export const getTasks = (done) => taskApi.get(`/?done=${done}`)

export const getTask=(id)=>taskApi.get(`/${id}/`)

export const createTask = (task) => taskApi.post("/",task);

export const deleteTask =(id)=>taskApi.delete(`/${id}/`)

export const updateTask = (id,task)=>taskApi.put(`/${id}/`,task)



