import { PostState } from "./PostSlice";
import axios from "axios";

const API_URL = "http://localhost:3000";

export async function fetchPosts() {
    // return fetch(`${API_URL}/posts`, {
    //     headers: {
    //         "Content-Type": "application/json "
    //     }
    // }).then((response) => response.json())
    // .catch((error) =>  {
    //     console.log("Error: ", error);
    //     return {} as PostState;
    // });
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE2NzQ0NzAyOTl9.fmBjCpZZlJK2qBdxSHQijpyX-VWXgW9kCP9biOJw_iQ";
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