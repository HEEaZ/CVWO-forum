import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createPostAsync } from './PostSlice'
import { useNavigate } from 'react-router-dom';

function PostForm() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e:React.MouseEvent) => {
        e.preventDefault();
        const formData = {
            post: {
                title: title,
                body: body
            }
        }
        await dispatch(createPostAsync(formData)).unwrap()
            .then((response) => {
                console.log(response)
                if (response.status == 201) {
                    navigate("/");
                } else {
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            });
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