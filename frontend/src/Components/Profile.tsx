import { useSelector } from "react-redux";
import { selectPosts } from "../features/posts/postsSlice";
import { selectUser } from "../features/user/userSlice";
import Post from "../features/posts/Post";
import { useNavigate } from "react-router-dom";



function Profile() {
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);
    const navigate = useNavigate();
    const handleClick = (postId: number) => {
        navigate(`/posts/${postId}`);
      }
    
    const ownPosts = posts.filter((post) => post.user_id === user.id);
    const ownPostsEl = ownPosts.length === 0 
        ? <div>You do not have any posts</div>
        : ownPosts.map((post) => (
            <div key={post.id} style={{margin: "5em"}} onClick={() => handleClick(post.id)}>
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