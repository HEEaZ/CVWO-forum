import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { deletePostAsync, fetchPostAsync, selectSinglePost, selectSinglePostStatus } from '../features/singlePost/singlePostSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Statuses } from '../features/posts/postsSlice';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectUser } from '../features/user/userSlice';

function SinglePost() {
  const id = parseInt(useParams().id!);
  const post = useAppSelector(selectSinglePost);
  const status = useAppSelector(selectSinglePostStatus);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPostAsync(id));
  }, [])

  const createdAt = <span>Created at: {new Date(post.created_at).toDateString()}</span>;
  const updatedAt = post.created_at == post.updated_at ? null : <span>Updated at: {new Date(post.updated_at).toDateString()}</span>;

  const commentsEl = post.comments?.length === 0 
    ? <div>No comments yet</div> 
    : post.comments?.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment comment={comment} />
      </div>
      )
    });

  const deletePost = (e:React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deletePostAsync(id)).unwrap()
      .then((response) => {
        if (response.status === 204) {
          navigate("/")
        } else {
          navigate("/logout")
        }
      })
  }

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
            {commentsEl}
            {user.id === 0 ? <div><Link to="/login">Log in</Link> to comment</div> : <CommentForm postId={id}/>}
        </div>
        <div>
          {user.id === post.user_id && 
            <button onClick={deletePost}>Delete Post</button>}
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