import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import singlePostReducer from '../features/singlePost/singlePostSlice';
import postsReducer from '../features/posts/postsSlice';
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    singlePost: singlePostReducer,
    user: userReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
