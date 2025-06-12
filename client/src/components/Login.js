import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrors('');
        const newErrors = {};

        if (!email) newErrors.email = 'Please enter your email';
        if (!password) newErrors.password = 'Please enter your password';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return
        };

        try {
            const res = await axios.post('/api/auth/login', {email, password});
            localStorage.setItem('token', res.data.token);
            navigate('/MainPage')
        } catch (err) {
            console.error('Login error:', err);
            setErrors({server: 'Invalid email or password'});
        }
    }

    const show = <i class="bi bi-eye"></i>
    const hide = <i class="bi bi-eye-slash"></i>

  return (
    <div>
        <div className='container-fluid vh-100 text-bg-light d-flex flex-row justify-content-center align-items-center'>
            <div className='container-sm w-50 p-4 border rounded d-flex flex-column justify-content-center align-items-center'>
                <div className='text-center mb-5'><h3>Login</h3></div>
                <div className="form-floating mb-3 w-50">
                    <input 
                        style={{outline:'none', boxShadow:'none'}} 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <label for="floatingInput">Email address</label>
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
                </div>
                <div className='text-center mt-5'><button type="submit" className="btn btn-outline-success" onClick={handleLogin}>Sign In</button></div>
                <div className='d-flex flex-row justify-content-between w-100'>
                    <a className='link-secondary' href='/Registration'>Don't have an account?</a>
                    <a className='link-secondary' href='1'>Forgot password?</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login