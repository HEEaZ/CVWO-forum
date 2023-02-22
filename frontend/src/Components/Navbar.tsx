import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/user/userSlice';
import {MdOutlineForum} from 'react-icons/md'

function Navbar() {
    const user = useSelector(selectUser);
    
  return (
    <header className="bg-cyan-400 shadow p-3 px-5" >
        <nav className='md:flex md:items-center md:justify-between'>
            
            <Link to="/" className='text-2xl font-[Poppins] cursor-pointer hover:text-black'><MdOutlineForum className='h-10 inline'/><span className='mx-2'>Forum</span></Link>
            <ul className='md:flex md:items-center'>
                {user.id !== 0 && <li className='mx-1'> <Link className='text-xl hover:text-white duration-500' to="/create">Create new Post</Link></li>}
                {user.id !== 0 && <li className='mx-4'> <Link className='text-xl hover:text-white duration-500' to="/profile">My Posts</Link></li>}
                {user.id === 0 ? <li className='mx-4'><Link className='text-xl hover:text-white duration-500' to="/login">Log in</Link></li> : <li><Link className='text-xl hover:text-white duration-500' to="/logout">Log out</Link></li>}  
            </ul>
         </nav>
    </header>    
  )
}

export default Navbar