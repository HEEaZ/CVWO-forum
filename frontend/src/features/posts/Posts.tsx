import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Post from './Post';
import { fetchPostsAsync, PostState, selectPosts, selectStatus, Statuses } from './postsSlice'

function Posts() {
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      dispatch(fetchPostsAsync());
  }, [])

  const [search, setSearch] = useState("");
  const getFilteredPosts = (search: string) => {
    if (!search) {
      return posts;
    }
    let filtered = posts;
    const searchWords = search.match(/\b(\w+)\b/g);
    searchWords?.forEach((word:string) => {
      filtered = filtered.filter((post: PostState) => {
        const stringmass = post.title + post.body + post.user.username + post.tags.toString();
        return stringmass.includes(word);
      })
    })
    return filtered;
  }
  const filteredItems = getFilteredPosts(search);

  const handleClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  }
  
  let contents;

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = 
        <div className="card-body">
            {filteredItems.map(post => {
                return (
                    <div key={post.id} style={{margin: "5em"}} onClick={() => handleClick(post.id)}>
                        <Post 
                            post={post} />
                    </div>
                )
            })}
        </div>
  }

  return (
    <div className='card'>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        {contents}
    </div>
  )
}

export default Posts