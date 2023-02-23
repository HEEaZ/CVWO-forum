import axios from "axios";
import { CommentFormState, SinglePostState } from "../enums";
import { API_URL } from "../../app/env";

export async function fetchPost(postId: number) {
    return axios.get(`${API_URL}/posts/${postId}`)
        .then(response => response.data)
        .catch(error => {
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

export async function deletePost(postId: number) {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.delete(`${API_URL}/posts/${postId}`, config)
        .then(response => response.data)
        .catch(err => err.response);
}

export async function deleteComment(postId: number, commentId: number) {
    const token = localStorage.getItem("token");
    const config = {
        headers: { Authorization: `Bearer ${token}`}
    }
    return axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}`, config)
        .then(response => response.data)
        .catch(err => err.response);
}