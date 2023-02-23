import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { deletePostAsync, fetchPostAsync, selectSinglePost, selectSinglePostStatus } from '../features/singlePost/singlePostSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Statuses } from '../features/enums';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { selectUser, selectUserLoggedIn } from '../features/user/userSlice';
import { MdDeleteOutline } from 'react-icons/md';

function SinglePost() {
  const id = parseInt(useParams().id!);
  const post = useAppSelector(selectSinglePost);
  const status = useAppSelector(selectSinglePostStatus);
  const user = useAppSelector(selectUser);
  const userIsLoggedIn = useAppSelector(selectUserLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPostAsync(id));
  }, [])

  const createdAt = <span>Created at: {new Date(post.created_at).toDateString()}</span>;
  const updatedAt = post.created_at === post.updated_at ? null : <span>Updated at: {new Date(post.updated_at).toDateString()}</span>;

  const commentsEl = post.comments?.length === 0 
    ? <div>No comments yet</div> 
    : post.comments?.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment comment={comment} postId={post.id}/>
        </div>
      )
    });

  const deletePost = (e:React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deletePostAsync(id)).unwrap()
      .then((response) => {
        if (response) {
          navigate("/logout")
        }
        navigate("/")
      })
  }

  const tagElement = post.tags.map((tag: string, index: number) => {
    return (
        <span key={index} className="bg-green-400 px-2 py-1 mx-1 rounded-md text-xs text-white">{tag}</span>
    );
  })

  let content;
  if (status !== Statuses.UpToDate) {
    content = <div>{status}</div>
  } else {
    content = 
    <div>
        <div className='my-3 flex justify-between'>
          <div>
            <h1 className='text-2xl font-black'>{post.title}</h1>
            <b>By {post.user?.username}</b>
            <p>{createdAt} {updatedAt}</p>
          </div>
          <div className='inline p-2 m-2'>
            {user.id === post.user_id && 
            <button onClick={deletePost}><MdDeleteOutline size={40} color='red'/></button>}
          </div>
        </div>
        <p className='my-3'>{post.body}</p>
        <div className='col-8'>
          {
            post.tags.map((tag: string, index: number) => {
              return (
                  <span key={index} className="bg-green-400 px-2 py-1 mx-1 rounded-md text-xs text-white">{tag}</span>
              );
            })
          }
        </div>
        <br/>
        <div>
            <h2 className='text-2xl font-bold'>Comments:</h2>
            {commentsEl}
            {userIsLoggedIn ? <CommentForm postId={id}/> : <div><Link to="/login">Log in</Link> to comment</div>}
        </div>
        
    </div>
  }
  
  return (
    <div className='p-5'>
        {content}
    </div>
  )
}

export default SinglePost