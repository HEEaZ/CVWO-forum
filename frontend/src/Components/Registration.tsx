import React, {useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signUp } from '../features/auth-service';
import { UserFormData } from '../features/posts/PostSlice';

function Registration() {
    const initialValues = {username: "", email: "", password: "", password_confirmation: ""}
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formData)
        if (Object.keys(errors).length === 0) {
            console.log("Submit Form")
        }
        setFormErrors(errors);
        await signUp(formData).then((response) => {
            if (response.status == 200) {
                navigate("/login");
            } else {
                console.log(response.data)
                alert(response.data?.errors[0])
            }
        });
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
        } else if (formValues.password != formValues.password_confirmation) {
            errors.password_confirmation = "Passwords do not match!"
        }
        return errors;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div>
                <div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={formData.username}
                        onChange={handleChange}/>
                    <p>{formErrors.username}</p>
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="YourEmail@domain.com" 
                        value={formData.email}
                        onChange={handleChange}/>
                    <p>{formErrors.email}</p>
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password}
                        onChange={handleChange}/>
                    <p>{formErrors.password}</p>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Re-enter your password" 
                        value={formData.password_confirmation}
                        onChange={handleChange}/>
                    <p>{formErrors.password_confirmation}</p>
                </div>
                <button type="submit">Register</button>
            </div>
        </form>
    )
}

export default Registration