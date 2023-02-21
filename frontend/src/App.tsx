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

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/" element={ <Home /> } />
        <Route path="/create" element={ <CreatePost /> } />
        <Route path="/register" element={ <Registration />} />
        <Route path="/logout" element={ <Logout />} />
        {<Route path="/posts/:id" element={< SinglePost />} />}
        {/* <Route path="*" element={ <NotFound /> } /> */}
      </Routes>
    </>
  );
}

export default App;
