import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { checkLoggedIn, login } from "../auth-service";
import { UserState, Statuses, LoginFormData } from "../enums";

const initialState: UserState = {
    user: {
        id: 0,
        username: "",
        email: "",
    },
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
        if (response.status !== 200) {
            logout();
        }
        return response;
    }
)

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            return initialState;
        }
   },
   extraReducers: (builder) => {
       builder
           /** Fetch post */
           .addCase(loginAsync.pending, (state) => {
               state.status = Statuses.Loading;
           })
           .addCase(loginAsync.fulfilled, (state, action) => {
                if (action.payload.status === 200) {
                    state.user = action.payload.data.user;
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
                }
                state.status = Statuses.UpToDate;
                })  
            .addCase(checkLoggedInAsync.rejected, (state) => {
                state.status = Statuses.Error
            })
   }
});

export const selectUser = (state: RootState) => state.user.user
export const {logout} = userSlice.actions;
export default userSlice.reducer;