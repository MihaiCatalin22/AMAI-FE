import axios from 'axios';

const API_URL = "http://localhost:8080"; 
const afterSlash = "users";

const UserService = {
    register: (user,url) => axios.post(`${API_URL}/${afterSlash}/register`,
    {
       "user": {
            "username": user.username,
            "password": user.password,
            "email": user.email,
            "fullName": user.fullName
        },
        "url":url

    }
    ),
    verify:(code) => axios.get(`${API_URL}/${afterSlash}/verify/${code}`)
}

export default UserService;