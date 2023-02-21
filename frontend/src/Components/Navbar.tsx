import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';

function Navbar() {
    const user = useSelector(selectUser);
    
  return (
    <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user.id !== 0 && 
          <li>
             <Link to="/create">Create new Post</Link>
          </li>
          }
          <li>
            {user.id === 0 ? <Link to="/login">Log in</Link> : <Link to="/logout">Log out</Link>}
          </li> 
        </ul>
      </nav>
  )
}

export default Navbar