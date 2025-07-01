import React, { useState } from 'react'
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const savedTheme = localStorage.getItem('theme')

    document.documentElement.setAttribute('data-bs-theme', savedTheme);

    const handleLogin = async () => {
        setErrors({});
        const newErrors = {};

        if (!email) newErrors.email = 'Please enter your email';
        if (!password) newErrors.password = 'Please enter your password';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        };

        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
            if (!res.data.token) {
                setErrors({ server: 'Invalid email or password' });
                return;
            }
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('name', res.data.user?.name || '');

            try {
                const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
                localStorage.setItem('userId', tokenPayload.userId);
            } catch (err) {
                console.error('Failed to decode token:', err);
            }

            navigate('/PersonalPage');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrors({ server: 'Invalid email or password' });
            } else {
                setErrors({ server: 'An error has occurred, please try again.' });
            }
        }
    }

    const show = <i class="bi bi-eye"></i>
    const hide = <i class="bi bi-eye-slash"></i>

  return (
    <div>
        <div className='container-fluid vh-100 d-flex flex-row justify-content-center align-items-center'>
            <div className='container-sm w-50 p-4 border rounded d-flex flex-column justify-content-center align-items-center'>
                <div className='text-center mb-5'><h3>Login</h3></div>
                <div className="form-floating mb-3 w-50">
                    <input 
                        style={{outline:'none', boxShadow:'none'}} 
                        type="email" 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        id="floatingInput" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
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
                {errors.server && (
                        <div className="invalid-feedback d-block text-center">
                            {errors.server}
                        </div>
                )}
                <div className='text-center mt-5'><button type="submit" className="btn btn-outline-success" onClick={handleLogin}>Sign In</button></div>
                <div className='d-flex flex-row justify-content-between w-100'>
                    <a className='link-secondary' href='/Registration'>Don't have an account?</a>
                    <a className='link-secondary' onClick={() => setShowToast(true)} href='#'>Forgot password?</a>
                </div>
                {showToast && (
                    <div className="alert alert-success alert-dismissible fade show position-absolute m-5 bottom-0 end-0" role="alert">
                    Write to <a href='mailto:lukharchik@gmail.com' target='_blank'>this email</a> to reset your password.
                    <button type="button" className="btn-close p-3" onClick={() => setShowToast(false)}></button>
                </div>)}
            </div>
        </div>
    </div>
  )
}

export default Login