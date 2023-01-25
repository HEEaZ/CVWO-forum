import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import { useEffect } from 'react';
import Registration from './Components/Registration';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login';
import Logout from './Components/Logout';
import SinglePost from './Components/SinglePost';

function App() {
  let loggedIn;
  useEffect(() => {
    loggedIn = localStorage.getItem("token")
    console.log(loggedIn);
  }, [])
  
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create">Create new Post</Link>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li> 
          <li>
            <Link to="/logout">Log out</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* 
        <Route path="/profile" element={ <Profile /> } />
         */}
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/create" element={ <CreatePost /> } />
        <Route path="/register" element={ <Registration />} />
        <Route path="/logout" element={ <Logout />} />
        <Route path="/posts/:id" element={< SinglePost />} />
        {/* <Route path="*" element={ <NotFound /> } /> */}
      </Routes>
    </>
  );
}

export default App;
