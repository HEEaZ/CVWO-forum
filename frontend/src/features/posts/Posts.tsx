import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchPostsAsync, selectPosts, selectStatus, Statuses } from './PostSlice'

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [])
  
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = <div className="card">
        <div className="card-body">
            <h3>{status}</h3>
            {posts && posts.length > 0 && posts.map(post => {
                return (
                    <div key={post.id} style={{margin: "5em"}}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
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