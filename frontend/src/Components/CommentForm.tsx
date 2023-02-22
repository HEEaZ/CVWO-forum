import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { createCommentAsync } from '../features/singlePost/singlePostSlice';

interface PropState{
    toggleRefresh: () => void,
    postId: number
}

function CommentForm(props:PropState) {
    const [body, setBody] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const submitHandler = async (e:React.FormEvent) => {
        e.preventDefault();
        if (!body) {
            alert("Enter some text to comment!");
            return;
        }
        const formData = {
            postId: props.postId,
            comment: {
                body: body
            }
        }
        await dispatch(createCommentAsync(formData)).unwrap()
            .then((response) => {
                if (response.status === 201) {
                    props.toggleRefresh();
                } else {
                    navigate("/login");
                }
            });
    }
    return (
        <div className='my-4'>
            <h5>Drop a comment: </h5>
            <form onSubmit={submitHandler}>
                <textarea className="form-control text-start" name="body" value={body} onChange={e => setBody(e.target.value)} />
                <button type="submit" className='bg-blue-500 w-max px-2 text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors'>Submit</button>
            </form>
        </div>
      )
}

export default CommentForm