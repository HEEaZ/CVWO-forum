import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import Post from './Post';
import { fetchPostsAsync, selectPosts, selectStatus} from '../features/posts/postsSlice'
import { PostState, Statuses } from '../features/enums';

function Posts() {
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(fetchPostsAsync());
  }, [dispatch])
  const posts = useAppSelector(selectPosts);
  const status = useAppSelector(selectStatus);

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
        return stringmass.toLowerCase().includes(word);
      })
    })
    return filtered;
  }
  const filteredItems = getFilteredPosts(search)
  const filteredContent = filteredItems === null 
    ? <></> 
    : filteredItems.map(post => {
      return (
          <div key={post.id}>
              <Post 
                  post={post} />
          </div>
      )})

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = 
        <div className="card-body">
            {filteredItems.map(post => {
              return (
                <div key={post.id}>
                  <Post 
                    post={post} />
                </div>
            )})}
        </div>
  }
  return (
    <div>
      <div className=' flex card-body items-center content-center justify-center'>
          <input type="text" placeholder='Search for posts here' onChange={(e) => setSearch(e.target.value)}
            className='w-3/4 self-center p-2 mt-2 mb-0 outline-slate-200 hover:outline-slate-300 border' />
      </div>
      {contents}
    </div>
  )
}

export default Posts