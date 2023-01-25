import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppDispatch } from '../../app/store';
import Post from './Post';
import PostForm from './PostForm';
import { fetchPostsAsync, selectPosts, selectStatus, Statuses } from './postsSlice'

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      dispatch(fetchPostsAsync());
  }, [])

  const handleClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  }
  
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <div className="card">
        <div className="card-body">
            <h3>{status}</h3>
            {posts.map(post => {
                return (
                    <div key={post.id} style={{margin: "5em"}} onClick={() => handleClick(post.id)}>
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