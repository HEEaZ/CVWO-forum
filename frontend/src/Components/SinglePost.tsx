import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { fetchPostAsync, selectSinglePost, selectSinglePostStatus } from '../features/singlePost/singlePostSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Statuses } from '../features/posts/postsSlice';
import Comment from './Comment';
import CommentForm from './CommentForm';

function SinglePost() {
  const id = parseInt(useParams().id!);
  const post = useAppSelector(selectSinglePost);
  const status = useAppSelector(selectSinglePostStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPostAsync(id));
  }, [])

  const createdAt = <span>Created at: {new Date(post.created_at).toDateString()}</span>;
  const updatedAt = post.created_at == post.updated_at ? null : <span>Updated at: {new Date(post.updated_at).toDateString()}</span>;

  let content;
  if (status !== Statuses.UpToDate) {
    content = <div>{status}</div>
  } else {
    content = 
    <div>
        <div>
            <h1>{post.title}</h1>
            <b>By {post.user?.username}</b>
            <p>{createdAt} {updatedAt}</p>
            <p>{post.body}</p>
        </div>
        <br/>
        <div>
            <h2>Comments:</h2>
            {post.comments?.map((comment) => {
                return (
                    <div key={comment.id}>
                        <Comment comment={comment} />
                    </div>
                )
            })}
            <CommentForm postId={id}/>
        </div>
    </div>
  }
  
  return (
    <div>
        {content}
    </div>
  )
}

export default SinglePost