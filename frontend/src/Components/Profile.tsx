import { useSelector } from "react-redux";
import { fetchPostsAsync, selectPosts } from "../features/posts/postsSlice";
import { selectUser, selectUserLoggedIn } from "../features/user/userSlice";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const user = useSelector(selectUser)
  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login")
    }
    dispatch(fetchPostsAsync());
    }, [dispatch, navigate, userLoggedIn])

  const posts = useSelector(selectPosts);
  const ownPosts = posts.filter((post) => post.user_id === user.id);
  const ownPostsEl = ownPosts.length === 0 
      ? <div className="m-2">You do not have any posts</div>
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