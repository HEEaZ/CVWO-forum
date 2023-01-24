import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppDispatch } from '../../app/store';
import Post from './Post';
import PostForm from './PostForm';
import { fetchPostsAsync, selectPosts, selectStatus, Statuses } from './PostSlice'

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status == Statuses.UpToDate) {
        dispatch(fetchPostsAsync());
    }
  }, [dispatch])
  
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <div className="card">
        <div className="card-body">
            <h3>{status}</h3>
            <PostForm dispatch={dispatch}/>
            {posts && posts.length > 0 && posts.map(post => {
                return (
                    <div key={post.id} style={{margin: "5em"}}>
                        <Post 
                            dispatch={dispatch}
                            post={post} />
                    </div>
                )
            })}
        </div>
    </div>
  }

  return (
    <div>
        {contents}
    </div>
  )
}

export default Posts