import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setCredentials: (state, action) => {
//             const { user, token } = action.payload;
//             state.user = user;
//             state.token = token;
//         },
//         logout: (state, action) => {
//             state.user = null;
//             state.token = null;
//         }
//     },
// })

// export const {setCredentials, logout} = authSlice.actions;
// export default authSlice.reducer;
// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;