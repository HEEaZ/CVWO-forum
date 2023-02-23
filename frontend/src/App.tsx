import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login';
import Logout from './Components/Logout';
import SinglePost from './Components/SinglePost';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile'
import NotFound from './Components/NotFound';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { checkLoggedInAsync } from './features/user/userSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkLoggedInAsync());
  }, [])
  
  return (
    <div className='flex h-screen flex-col'>
      <Navbar />
      <Routes>
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/create" element={ <CreatePost /> } />
        <Route path="/register" element={ <Registration />} />
        <Route path="/logout" element={ <Logout />} />
        <Route path="/posts/:id" element={< SinglePost />} />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  );
}

export default App;
