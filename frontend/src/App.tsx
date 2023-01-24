import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Posts from './features/posts/Posts';
import Registration from './Registration';

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
        </ul>
      </nav>
      <div className="App">
        Hello World!
        <Posts />
      </div>
      <Routes>
        {/* <Route path="/" element={ <Home /> } />
        <Route path="/create" element={ <CreatePost /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/login" element={ <Login /> } /> */}
        <Route path="/register" element={ <Registration />} />
        {/* <Route path="*" element={ <NotFound /> } /> */}
      </Routes>
    </>
  );
}

export default App;
