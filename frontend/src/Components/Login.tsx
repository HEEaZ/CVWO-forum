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
                    alert(response.data.error);
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
        <div className='flex-1 flex items-center justify-center bg-gray-100'>
            <form onSubmit={handleSubmit}>
                <div className='bg-white w-96 p-6 rounded shadow-sm'>
                    <div className='flex items-center justify-center mb-4'>
                        <img className='h-32' src="https://st2.depositphotos.com/7752738/11163/v/950/depositphotos_111634948-stock-illustration-concept-of-social-communication-group.jpg" />
                    </div>
                    <label className='text-gray-700'>Username</label>
                    <input
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4" 
                        type="text" name="username" placeholder="Username" value={formData.username}
                                onChange={handleChange}
                    />
                    <label className='text-gray-700'>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-4"
                    />
                    <button type="submit" className='bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors'>Login</button>
                    <Link to="/register">
                        <button type="button" className='bg-blue-500 w-full text-gray-100 py-2 my-2 rounded hover:bg-blue-600 transition-colors'>Register</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login