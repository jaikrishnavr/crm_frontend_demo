import axios from 'axios';

const BASE_URL = process.env.REACT_APP_CRM_BACKEND_URL;

export async function getAllUsers(data){
    return axios.get(`${BASE_URL}/crm/api/v1/users`,{
        headers:{
            'x-access-token':localStorage.getItem("token")
        }
    });
}