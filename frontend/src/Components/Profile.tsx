import { useSelector } from "react-redux";
import { fetchPostsAsync, selectPosts } from "../features/posts/postsSlice";
import { selectUser } from "../features/user/userSlice";
import Post from "../features/posts/Post";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";

function Profile() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPostsAsync());
    }, [])
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  
  const ownPosts = posts.filter((post) => post.user_id === user.id);
  const ownPostsEl = ownPosts.length === 0 
      ? <div>You do not have any posts</div>
      : ownPosts.map((post) => (
          <div key={post.id} className="my-3">
              <Post post={post} />
          </div>
      ))
  return (
    <div>
        {ownPostsEl}
    </div>
  )
}

export default Profile