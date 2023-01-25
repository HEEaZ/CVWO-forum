import React from 'react'

function Comment(props: any) {
  const comment = props.comment;
  return (
    <div>
        <b>{comment.user.username}</b>
        <p>{comment.body}</p>
    </div>
  )
}

export default Comment