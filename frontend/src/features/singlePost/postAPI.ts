import axios from "axios";
import { CommentFormState, SinglePostState } from "./singlePostSlice";

const API_URL = "http://localhost:3000";

export async function fetchPost(postId: number) {
    return axios.get(`${API_URL}/posts/${postId}`)
        .then(response => response.data)
        .catch(error => {
            console.log("Error: ", error);
            return {} as SinglePostState;
        });
}

export async function createComment(commentData: CommentFormState) {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.post(`${API_URL}/posts/${commentData.postId}/comments`, commentData, config)
        .then(response => response)
        .catch(error => {
            return error.response
        });
}