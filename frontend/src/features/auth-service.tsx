import axios from "axios";
import { LoginFormData, UserFormData } from "./posts/postsSlice";

const API_URL = "http://localhost:3000";

export const signUp = async (userForm:UserFormData) => {
    return axios.post(
        API_URL + '/users', 
        {
            user: userForm
        }
    ).then((response) => {
        return response;
    }).catch((err) => {
        if (err.response) {
            return err.response
        }
    })
}

export const login = (loginForm: LoginFormData) => {
    return axios.post(
        API_URL + '/login',
        loginForm
    ).then(((response) => {
        localStorage.setItem("token", response.data.token)
        return response;
    })).catch((err) => {
        return err.response;
    })
}

