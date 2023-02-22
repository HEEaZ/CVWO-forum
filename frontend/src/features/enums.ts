export interface UserData {
    id: number,
    username: string,
    email: string,
}

export interface UserState {
    user: UserData,
    status: string
}

export interface UserFormData { 
    username: string 
    email: string
    password: string
    password_confirmation: string
}

export interface LoginFormData {
    username: string
    password: string
 }

 export interface CommentState {
    id: number
    body: string
    user_id: number
    created_at: /*string*/ any
    updated_at: /*string*/ any
    user: {
        username: string
    }
}

export interface PostState {
    id: number
    title: string
    body: string
    user_id: number
    created_at: /*string*/ any
    updated_at: /*string*/ any
    comments?: CommentState[]
    user: {
        username: string
    }
}

export interface CommentFormState {
    postId: number;
    comment: {
        body: string
    }
}

export interface SinglePostState {
  post: PostState
  status: Statuses;
}

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
    updated_at: /*string*/ any; 
    user: {
        username: string
    }
    tags: string[];
 }  

 export interface PostsState {
     posts: PostState[];
     status: string; 
 }

 export interface PostFormData {
    post: {
        title: string,
        body: string,
        tags: string[]
    }
 }