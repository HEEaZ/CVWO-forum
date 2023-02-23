import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/user/userSlice';


function Logout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout());
    navigate("/");
  }, [dispatch, navigate])

  return (<div></div>)
}

export default Logout