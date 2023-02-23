import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div>
        <div>Page does not Exist</div>
        <Link to="/">Back to Home</Link>    
    </div>
)
}

export default NotFound