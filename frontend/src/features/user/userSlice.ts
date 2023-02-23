import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { checkLoggedIn, login } from "./auth-service";
import { UserData, UserState, Statuses, LoginFormData } from "../enums";
import { createPostAsync } from "../posts/postsSlice";
import { createCommentAsync, deletePostAsync } from "../singlePost/singlePostSlice";

const nouser: UserData = {
    id: 0,
    username: "",
    email: ""
}

const initialState: UserState = {
    user: nouser,
    isLoggedIn: false,
    status: Statuses.Initial
}

export const loginAsync = createAsyncThunk(
   'user/login',
   async (payload: LoginFormData) => {
        const response = await login(payload);
        return response;
   }
)

export const checkLoggedInAsync = createAsyncThunk(
    'user/checkLogin',
    async () => {
        const response = await checkLoggedIn();
        return response;
    }
)

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
        logout: () => {
            localStorage.removeItem("token");
            return initialState;
        }
   },
   extraReducers: (builder) => {
       builder
           .addCase(loginAsync.pending, (state) => {
               state.status = Statuses.Loading;
           })
           .addCase(loginAsync.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.user = action.payload.data.user;
                    state.isLoggedIn = true;
                    localStorage.setItem("token", action.payload.data.token)
                }
                state.status = Statuses.UpToDate;
           })
           .addCase(loginAsync.rejected, (state) => {
               state.status = Statuses.Error
           })
           .addCase(checkLoggedInAsync.pending, (state) => {
                state.status = Statuses.Loading;
           })
           .addCase(checkLoggedInAsync.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    const userData = action.payload.data;
                    state.user.id = userData.user_id
                    state.user.username = userData.user_username;
                    state.user.email = userData.user_email;
                    state.isLoggedIn = true;
                } else {
                    localStorage.removeItem("token");
                    state.isLoggedIn = false;
                    return initialState;
                }
                state.status = Statuses.UpToDate;
                })  
            .addCase(checkLoggedInAsync.rejected, (state) => {
                state.status = Statuses.Error
            })
            .addCase(createCommentAsync.fulfilled, (state, action) => {
                if (action.payload.status === 401) {
                    localStorage.removeItem("token");
                    state.isLoggedIn = false;
                    return initialState;
                }
            })
            .addCase(deletePostAsync.fulfilled, (state, action) => {
                if (action.payload.status == 401) {
                    localStorage.removeItem("token");
                    state.isLoggedIn = false;
                    return initialState;
                }
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                if (action.payload.status == 401) {
                    localStorage.removeItem("token");
                    state.isLoggedIn = false;
                    return initialState;
                }
            })
   }
});

export const selectUser = (state: RootState) => state.user.user
export const selectUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const { logout } = userSlice.actions;
export default userSlice.reducer;