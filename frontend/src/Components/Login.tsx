import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../features/auth-service';
import { Link } from 'react-router-dom';

function Login() {
    const initialValues = {username: "", password: ""}
    const [formData, setFormData] = useState(initialValues);
    const navigate = useNavigate();


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formData)
            .then((response) => {
                if (response.status == 200) {
                    navigate("/");
                } else {
                    alert(response.data.error);
                }
            })
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