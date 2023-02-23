import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../features/user/auth-service';
import { UserFormData } from '../features/enums';

function Registration() {
    const [formData, setFormData] = useState({username: "", email: "", password: "", password_confirmation: ""});
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formData)
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            await signUp(formData).then((response) => {
                if (response.status === 201) {
                    navigate("/login");
                } else {
                    alert(response.data?.errors[0])
                }
            });
        }
    }

    const validate = (formValues: UserFormData) => {
        const errors: {[key: string]: string} = {};
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!formValues.username) {
            errors.username = "Username is required!"
        }
        if (!formValues.email || !emailRegex.test(formValues.email)) {
            errors.email = "Please enter a valid email address!"
        }
        if (!formValues.password || !passwordRegex.test(formValues.password)) {
            errors.password = "Password must have a minimum of 8 characters, with at least 1 letter, 1 number, and 1 special character!"
        } else if (formValues.password !== formValues.password_confirmation) {
            errors.password_confirmation = "Passwords do not match!"
        }
        return errors;
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <form onSubmit={handleSubmit}>
                <div className='bg-white w-96 p-6 rounded shadow-sm'>
                    <div className='flex items-center justify-center mb-4'>
                        <img className='h-32' src="https://st2.depositphotos.com/7752738/11163/v/950/depositphotos_111634948-stock-illustration-concept-of-social-communication-group.jpg" />
                    </div>
                    <label className='text-gray-700'>Username</label>
                    <input
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-0" 
                        type="text" name="username" placeholder="Username" value={formData.username}
                        onChange={handleChange}
                    />
                    <p className='text-sm mb-4 text-red-500'>{formErrors.username}</p>
                    <label className='text-gray-700'>Email</label>
                    <input
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-0" 
                        type="email" name="email" placeholder="YourEmail@domain.com" value={formData.email}
                        onChange={handleChange}
                    />
                    <p className='text-sm mb-4 text-red-500'>{formErrors.email}</p>
                    <label className='text-gray-700'>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-0"
                    />
                    <p className='text-sm mb-4 text-red-500'>{formErrors.password}</p>
                    <label className='text-gray-700'>Password</label>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Re-enter your password" 
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        className="w-full py-2 bg-gray-50 text-gray-500 px-1 outline-none mb-0"
                    />
                    <p className='text-sm mb-4 text-red-500'>{formErrors.password_confirmation}</p>
                    <button type="submit" className='bg-blue-500 w-full text-gray-100 py-2 rounded hover:bg-blue-600 transition-colors'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Registration