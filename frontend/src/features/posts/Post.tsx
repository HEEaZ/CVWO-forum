import { useNavigate } from "react-router-dom";
import { PostState } from "./postsSlice";

interface PropState {
    post: PostState
}

function Post(props:PropState) {
    const navigate = useNavigate();
    const handleClick = (postId: number) => {
        navigate(`/posts/${postId}`);
      }
    let bodyText = props.post.body;
    if (bodyText.length > 100) {
        bodyText = bodyText.slice(0, 100) + "..."
    }
    const titleElement = <h2 className="title text-start font-bold">{props.post.title}</h2>;
    const authorElement = <p className="card-text text-start font-semibold">By {props.post.user.username}</p>
    const bodyElement = <p className="card-text text-start">{bodyText}</p>;
    const tagElement = props.post.tags.map((tag: string, index: number) => {
        return (
            <span key={index} className="bg-green-400 px-2 py-1 mx-1 rounded-md text-xs text-white">{tag}</span>
        );
    })

  return (
    <div className="bg-cyan-200 p-2 rounded-lg mb-3 mx-auto cursor-pointer w-5/6 self-center"  onClick={() => handleClick(props.post.id)}>
        <div className="row">
            <div className="col-8 text-2xl">
                {titleElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {authorElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {bodyElement}
            </div>
        </div>
        <div className="row">
            <div className="col-8">
                {tagElement}
            </div>
        </div>
    </div>
  )
}

export default Post