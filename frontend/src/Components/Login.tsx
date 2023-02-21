import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginAsync } from '../features/user/userSlice';
import { useAppDispatch } from '../app/hooks';

function Login() {
    const [formData, setFormData] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(loginAsync(formData)).unwrap()
            .then((response) => {
                if (response.status === 200) {
                    navigate("/");
                } else {
                    alert(JSON.stringify(response.data));
                }
            });
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <div>
                        <label>Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}/>
                    </div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login