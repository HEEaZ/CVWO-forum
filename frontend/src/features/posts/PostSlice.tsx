 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { RootState } from "../../app/store";
 import { fetchPosts, createPost } from "./postAPI";

 export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
 }

 export interface LoginFormData {
    username: string
    password: string
 }

 export interface UserFormData { 
    username: string 
    email: string
    password: string
    password_confirmation: string
}

 export interface PostState {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: /*string*/ any;
    updated_at?: /*string*/ any; 
    user: {
        username: string
    }
 }  

 export interface PostsState {
     posts: PostState[];
     status: string; 
 }

 export interface PostFormData {
    post: {
        title: string,
        body: string
    }
 }

 const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            user_id: 1,
            created_at: "",
            updated_at: "Z",
            user: {
                username: ""
            }
        }
    ],
    status: Statuses.Initial
 }

 export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
         const response = await fetchPosts();
         return response;
    }
 )

 export const createPostAsync = createAsyncThunk(
    'posts/createPost',
    async (payload: PostFormData) => {
        const response = await createPost(payload);
        return response; 
    }
 )

 export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /** Fetch post */
            .addCase(fetchPostsAsync.pending, (state) => {
                state.status = Statuses.Loading;
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = Statuses.UpToDate;
            })
            .addCase(fetchPostsAsync.rejected, (state) => {
                state.status = Statuses.Error
            })
            /** Create post */
            .addCase(createPostAsync.pending, (state) => {
                state.status = Statuses.Loading;
            })
            .addCase(createPostAsync.fulfilled, (state) => {
                state.status = Statuses.UpToDate;
            })
            .addCase(createPostAsync.rejected, (state) => {
                console.log("error reached")
                state.status = Statuses.Error
            })
    }
 });

 export const selectPosts = (state: RootState) => state.posts.posts
 export const selectStatus = (state: RootState) => state.posts.status
 export default postSlice.reducer