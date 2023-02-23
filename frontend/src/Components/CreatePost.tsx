import React, { useState } from 'react'
import { useAppDispatch } from '../app/hooks';
import { createPostAsync } from '../features/posts/postsSlice';
import { useNavigate } from 'react-router-dom';
import { GoDiffAdded } from 'react-icons/go'
import { FiMinusSquare } from 'react-icons/fi'

function CreatePost() {
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
                if (response.status === 201) {
                    const postId = response.data.id;
                    navigate(`/posts/${postId}`);
                } else if (response.status === 422) {
                    alert(JSON.stringify(response.data));
                } else {
                    navigate("/login");
                }
            });
    }

  return (
    <div className='p-5'>
        <p className='text-2xl font-semibold'>Create New Post</p>
        <form>
            <div className='my-2'>
                <label>Title:</label>
                <input type="text" className="form-control text-start" name="title" value={title} onChange={handleChange} />
            </div>
            <div className='my-2'>
                <label>Body:</label>
                <textarea className="form-control text-start" name="body" value={body} onChange={handleChange}/>
            </div>
            <div className='my-2'>
                <label>Tags:</label>
                {tags.length < 5 && 
                    <div className='align-middle'>
                        <input className="align-middle form-control text-start w-24 inline" type="text" name="tag" value={tag} onChange={handleChange} />
                        <button onClick={handleAddTagClick} className="cursor-pointer align-middle p-1 mx-1"><GoDiffAdded size={30} color='green'/></button>
                    </div>
                }
                <div className='my-1'>
                    {tags.map((tag, index) => {
                        return (
                            <span key={index} className="mx-2">
                                <span className='align-middle bg-green-400 px-2 py-1 rounded-md text-base text-white'>{tag}</span>
                                <button onClick={e => handleRemoveTagClick(e, index)} className="align-middle m-0.5"><FiMinusSquare size={20} color='red'/></button>
                            </span>
                        );
                    })}
                </div>
            </div>
            <button className='my-3 bg-blue-500 w-max text-gray-100 p-2 rounded hover:bg-blue-600 transition-colors' type="submit" onClick={submitHandler}>Create</button>
        </form>
    </div>
  )
}

export default CreatePost