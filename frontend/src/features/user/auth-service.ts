import axios from "axios";
import { UserFormData, LoginFormData } from "../enums";

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
        return response;
    })).catch((err) => {
        return err.response;
    })
}

export const checkLoggedIn = () => {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.post(API_URL + '/checkLogin', {}, config)
        .then((response) => {
            return response;
        }).catch((err) => {
            if (err.response) {
                return err.response;
            }
        });
}

