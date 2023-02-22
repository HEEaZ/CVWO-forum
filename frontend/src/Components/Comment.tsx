import { CommentState } from '../features/enums';

interface PropState {
  comment: CommentState
}

function Comment(props: PropState) {
  const comment = props.comment;
  return (
    <div className='card p-2 rounded-xl m-2'>
        <p className='text-xl font-medium' >{comment.user.username}</p>
        <p className='text-base'>{comment.body}</p>
    </div>
  )
}

export default Comment