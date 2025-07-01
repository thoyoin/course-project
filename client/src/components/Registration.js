import React, { useState } from 'react'
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const savedTheme = localStorage.getItem('theme')

    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    const handleRegister = async () => {
        setErrors({});
        const newErrors = {};
        
        if (!name) newErrors.name = 'Name is required';
        if (!email) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        if (!confirmation) newErrors.confirmation = 'Please confirm your password';
        if (password !== confirmation) newErrors.confirmation = 'Passwords do not match';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        };

        try {
            await axios.post(`${API_URL}/api/auth/register`, {name, email, password});
            const res = await axios.post(`${API_URL}/api/auth/login`, {email, password});
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.user ? res.data.user.name : '');
            navigate('/PersonalPage');
        } catch (err) {
            console.error('Registration error:', err);
            setErrors({server: 'Registration failed'});
        }
    };

    const show = <i className="bi bi-eye"></i>
    const hide = <i className="bi bi-eye-slash"></i>

    return (
        <div className='container-fluid vh-100 d-flex flex-row justify-content-center align-items-center'>
        <div className='container-sm w-50 p-4 border rounded d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center mb-5'><h3>Registration</h3></div>
                {errors.server && <p className="text-danger">{errors.server}</p>}
            <div className="form-floating mb-3 w-50">
                <input 
                    style={{outline:'none', boxShadow:'none'}} 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                    id="floatingInput" 
                    placeholder="Name"
                    value={name} onChange={e => {
                        setName(e.target.value);
                        setErrors(prev => ({ ...prev, name: undefined }));
                    }}/>
                <label htmlFor="floatingInput">Name</label>
                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>
            <div className="form-floating mb-3 w-50">
                <input 
                    style={{outline:'none', boxShadow:'none'}} 
                    type="email" 
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email} onChange={e => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: undefined }));
                    }}/>
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
            </div>
            <div className="form-floating mb-3 w-50">
                <div className="input-group">
                    <input
                    style={{ outline: 'none', boxShadow: 'none', height:'51px'}}
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                        setErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    />
                    <button
                        type="button"
                        className="btn input-group-text btn-outline-success"
                        data-bs-toggle='button'
                        onClick={() => setShowPassword(prev => !prev)}
                        tabIndex={-1}
                    >
                        {showPassword ? hide : show}
                    </button>
                </div>
                {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
            </div>
            <div className="form-floating w-50">
                <div className='input-group'>
                    <input 
                        style={{outline:'none', boxShadow:'none', height:'51px'}} 
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${errors.confirmation ? 'is-invalid' : ''}`} 
                        id="floatingPassword" 
                        placeholder="Confirm password"
                        value={confirmation} onChange={e => {
                            setConfirmation(e.target.value);
                            setErrors(prev => ({ ...prev, confirmation: undefined }));
                        }}/>
                </div>
                {errors.confirmation && <div className='invalid-feedback'>{errors.confirmation}</div>}
            </div>
            <div className='text-center mt-5'>
                <button type="submit" className="btn btn-outline-success" onClick={handleRegister}>Sign Up</button>
            </div>
            <div className='d-flex flex-row justify-content-start w-100'>
                <a className='link-secondary' href='/Login'>Already have an account?</a>
            </div>
        </div>
    </div>
  )
}

export default Registration;