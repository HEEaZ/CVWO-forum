import { useSelector } from 'react-redux';
import { CommentState } from '../features/enums';
import { selectUser } from '../features/user/userSlice';
import { MdDeleteOutline } from 'react-icons/md';
import { useAppDispatch } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { deleteCommentAsync } from '../features/singlePost/singlePostSlice';

interface PropState {
  postId: number
  comment: CommentState
}

function Comment(props: PropState) {
  const comment = props.comment;
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(deleteCommentAsync({postId: props.postId, commentId: comment.id})).unwrap()
      .then((response) => {
        if (response) {
          navigate("/logout")
        } else {
          window.location.reload();
        }
      })
  }
  return (
    <div className='card p-2 rounded-xl m-2'>
        <div className='flex justify-between'>
          <div>
            <p className='text-xl font-medium' >{comment.user.username}</p>
            <p className='text-xs'>{new Date(comment.created_at).toDateString()}</p>
          </div>
          <div className='inline p-2 mr-2'>
            {user.id === comment.user_id && 
            <button onClick={deleteComment}><MdDeleteOutline size={30} color='red'/></button>}
          </div>
        </div>
        <p className='text-base'>{comment.body}</p>
    </div>
  )
}

export default Comment