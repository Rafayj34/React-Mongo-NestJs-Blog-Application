import axios from 'axios'
export const axiosClient = axios.create({
    baseURL:"https://nest-backend-2hg5.onrender.com/api/v1"
})