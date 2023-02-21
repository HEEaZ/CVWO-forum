import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { createPostAsync } from './postsSlice'
import { useNavigate } from 'react-router-dom';

function PostForm() {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState("");
    const navigate = useNavigate();

    const handleAddTagClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (tag && tags.length < 5) {
            setTags((prevState) => [...prevState, tag.toLowerCase()]);
            setTag("");
        }
    }

    const handleRemoveTagClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        setTags((prevState) => {
            const prevArr = [...prevState];
            prevArr.splice(index, 1);
            return prevArr;
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        switch (e.target.name) {
            case "title":
                setTitle(e.target.value);
                break;
            case "body":
                setBody(e.target.value);
                break;
            case "tag":
                setTag(e.target.value);
                break;

        }
    }

    const submitHandler = async (e:React.MouseEvent) => {
        e.preventDefault();
        const submitData = {
            post: {
                title: title,
                body: body,
                tags: tags
            }
        }
        await dispatch(createPostAsync(submitData)).unwrap()
            .then((response) => {
                console.log(response)
                if (response.status == 201) {
                    navigate("/");
                } else if (response.status == 422) {
                    alert(JSON.stringify(response.data));
                } else {
                    navigate("/logout");
                }
            });
    }

  return (
    <div>
        <h1>PostForm</h1>
        <form>
            <input type="text" className="form-control text-start" name="title" value={title} onChange={handleChange} />
            <textarea className="form-control text-start" name="body" value={body} onChange={handleChange}/>
            {tags.length < 5 && 
                <div>
                    <input type="text" name="tag" value={tag} onChange={handleChange} />
                    <button onClick={handleAddTagClick}>Add Tag</button>
                </div>
            }
            <div>
                {tags.map((tag, index) => {
                    return (
                        <span key={index}>
                            {tag}
                            <button onClick={e => handleRemoveTagClick(e, index)}>Remove Tag</button>
                        </span>
                    );
                })}
            </div>
            <button type="submit" onClick={submitHandler}>Submit</button>
        </form>
    </div>
  )
}

export default PostForm