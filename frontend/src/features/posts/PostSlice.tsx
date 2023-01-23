 import { createAsyncThunk, createSlice, TaskAbortError } from "@reduxjs/toolkit";
 import produce from "immer";
 import { RootState } from "../../app/store";
 import { fetchPosts } from "./postAPI";

 export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error"
 }

 export interface PostState {
    id: number;
    title: string;
    body: string;
    user_id: number;
    created_at: /*string*/ any;
    updated_at?: /*string*/ any; 
 }  

 export interface PostsState {
     posts: PostState[];
     status: string; 
 }

 const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            user_id: 1,
            created_at: "",
            updated_at: "Z"
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

 export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
    }
 });

 export const selectPosts = (state: RootState) => state.posts.posts
 export const selectStatus = (state: RootState) => state.posts.status
 export default postSlice.reducer