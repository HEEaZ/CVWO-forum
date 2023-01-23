import { PostFormData, PostState } from "./PostSlice";
import axios from "axios";

const API_URL = "http://localhost:3000";
const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2NzQ0Nzk4NDF9.Ip_KUS6GZl-Vd63yJgKoOAxc7wdeVPitt0XGOSWbiE4";


export async function fetchPosts() {
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.get(`${API_URL}/posts`, config)
        .then(response => response.data)
        .catch(error => {
            console.log("Error: ", error);
            return {} as PostState;
        });
}

export async function createPost(payload: PostFormData) {
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.post(`${API_URL}/posts`, payload, config)
        .then(response => response.data)
        .catch(error => {
            console.log("Error: ", error);
            return {} as PostState;
        });
}