import React, { useEffect, useRef, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { UserFormData } from './features/posts/PostSlice';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function Registration() {
//     const userRef = useRef<HTMLInputElement>(null);
//     const pwdRef = useRef<HTMLInputElement>(null);
//     const matchPwdRef = useRef<HTMLInputElement>(null);
//     const emailRef = useRef<HTMLInputElement>(null);

//     const errRef = useRef();

//     const [user, setUser] = useState("");
//     const [pwd, setPwd] = useState("");
//     const validPwd = PWD_REGEX.test(pwd);
//     const [matchPwd, setMatchPwd] = useState("");
//     const [email, setEmail] = useState("");

//     const [errMsg, setErrMsg] = useState("");

//     useEffect(() => {
//         if (userRef.current) {
//             userRef.current.focus();
//         }
//     }, []);
    

//   return (
//     <div>
//         <h1>Register</h1>
//         <label htmlFor="email">
//             Email: 
//         </label>
//         <input
//             type="email"
//             id="email"
//             ref={emailRef}
//             onChange={e => setEmail(e.target.value)}
//             required />

//         <label htmlFor='username'>
//             Username: 
//         </label>
//         <input
//             type="text"
//             id="username"
//             ref={userRef}
//             autoComplete="off"
//             onChange={e => setUser(e.target.value)}
//             required/>

//         <label htmlFor='password'>
//             Password: 
//             {validPwd && <FontAwesomeIcon icon={faCheck} />}
//             {!validPwd && pwd && <FontAwesomeIcon icon={faTimes} />}
//         </label>
//         <input
//             type="password"
//             id="password"
//             ref={pwdRef}
//             onChange={e => setPwd(e.target.value)}
//             required />
        
//         {pwdRef.current === document.activeElement && !validPwd && 
//             <p>
//                 <FontAwesomeIcon icon={faInfoCircle} />
//                 8 to 24 characters. <br />
//                 Must include uppercase and lowercase letters, a number, and a special character.<br />
//                 Allowed special characters: '!@#$%' 
//             </p>}

//         <label htmlFor="confirm_pwd">
//             Confirm Password: 
//             {matchPwd == pwd && pwd && <FontAwesomeIcon icon={faCheck} />}
//             {matchPwd != pwd && <FontAwesomeIcon icon={faTimes} />}
//         </label>
//         <input
//             type="password"
//             id="confirm_pwd"
//             ref={matchPwdRef}
//             onChange={e => setMatchPwd(e.target.value)}
//             required />
//         {matchPwdRef.current === document.activeElement && matchPwd != pwd && 
//             <p>
//                 <FontAwesomeIcon icon={faInfoCircle} />
//                 Passwords must match.
//             </p>}

//     </div>
//   )
    const initialValues = {username: "", email: "", password: "", password_confirmation: ""}
    const [formData, setFormData] = useState(initialValues);
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validate(formData)
        if (Object.keys(errors).length === 0) {
            console.log("Submit Form")
        }
        setFormErrors(errors);
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
            errors.password = "Password has to have a minimum of 8 characters, with at least 1 letter, 1 number, and 1 special character!"
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