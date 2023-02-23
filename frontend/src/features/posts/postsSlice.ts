 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { RootState } from "../../app/store";
 import { fetchPosts, createPost } from "./postsAPI";
 import { PostsState, Statuses, PostFormData } from "../enums";

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
            },
            tags: []
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
        fetchPostsAsync();
        return response;
    }
 )

 export const postsSlice = createSlice({
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
    }
 });

 export const selectPosts = (state: RootState) => state.posts.posts
 export const selectStatus = (state: RootState) => state.posts.status
 export default postsSlice.reducer