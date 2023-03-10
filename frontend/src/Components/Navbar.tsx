import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '../features/user/userSlice';
import {MdOutlineForum} from 'react-icons/md'

function Navbar() {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    
  return (
    <header className="bg-cyan-400 shadow p-3 px-5" >
        <nav className='md:flex md:items-center md:justify-between'>
            
            <Link to="/" className='text-2xl font-[Poppins] cursor-pointer hover:text-black'><MdOutlineForum className='h-10 inline'/><span className='mx-2'>Forum</span></Link>
            <ul className='md:flex md:items-center'>
                {userLoggedIn && <li className='mx-1'> <Link className='text-xl hover:text-white duration-500' to="/create">Create New Post</Link></li>}
                {userLoggedIn && <li className='mx-4'> <Link className='text-xl hover:text-white duration-500' to="/profile">My Posts</Link></li>}
                {userLoggedIn ? <li><Link className='text-xl hover:text-white duration-500' to="/logout">Log out</Link></li> : <li className='mx-4'><Link className='text-xl hover:text-white duration-500' to="/login">Log in</Link></li>}  
            </ul>
         </nav>
    </header>    
  )
}

export default Navbar