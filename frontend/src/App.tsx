import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import CreatePost from './Components/CreatePost';
import Login from './Components/Login';
import Logout from './Components/Logout';

function App() {
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
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
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
        {/* <Route path="*" element={ <NotFound /> } /> */}
      </Routes>
    </>
  );
}

export default App;
