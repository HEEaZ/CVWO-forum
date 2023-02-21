import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { createCommentAsync } from '../features/singlePost/singlePostSlice';

function CommentForm(props:any) {
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
                    window.location.reload();
                } else {
                    navigate("/logout");
                }
            });
    }
    return (
        <div>
            <h5>Drop a comment: </h5>
            <form onSubmit={submitHandler}>
                <input type="text" className="form-control text-start" name="body" value={body} onChange={e => setBody(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
      )
}

export default CommentForm