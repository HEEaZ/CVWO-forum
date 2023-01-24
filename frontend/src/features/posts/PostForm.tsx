import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createPostAsync } from './PostSlice'

function PostForm(props: any) {
    const dispatch = props.dispatch;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    
    function submitHandler(e:any) {
        e.preventDefault();
        const formData = {
            post: {
                title: title,
                body: body
            }
        }
        dispatch(createPostAsync(formData));
        resetState();
    }

    function resetState() {
        setTitle("");
        setBody(""); 
    }
  return (
    <div>
        <h1>PostForm</h1>
        <form>
            <input type="text" className="form-control text-start" name="title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="form-control text-start" name="body" value={body} onChange={e => setBody(e.target.value)}/>
            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    </div>
  )
}

export default PostForm