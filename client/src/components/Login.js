import React from 'react'

const Login = () => {
  return (
    <div>
        <div className='container-fluid vh-100 text-bg-light d-flex flex-row justify-content-center align-items-center'>
            <div className='container-sm w-50 p-4 border rounded d-flex flex-column justify-content-center align-items-center'>
                <div className='text-center mb-5'><h3>Login</h3></div>
                <div className="form-floating mb-3 w-50">
                    <input style={{outline:'none', boxShadow:'none'}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3 w-50">
                    <input style={{outline:'none', boxShadow:'none'}} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label for="floatingPassword">Password</label>
                </div>
                <div className='text-center mt-5'><button type="submit" className="btn btn-outline-success">Sign In</button></div>
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