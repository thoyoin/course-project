import React from 'react'

const Registration = () => {
  return (
    <div className='container-fluid vh-100 text-bg-light d-flex flex-row justify-content-center align-items-center'>
        <div className='container-sm w-50 p-4 border rounded d-flex flex-column justify-content-center align-items-center'>
            <div className='text-center mb-5'><h3>Registration</h3></div>
            <div className="form-floating mb-3 w-50">
                <input style={{outline:'none', boxShadow:'none'}} type="text" className="form-control" id="floatingInput" placeholder="Name"/>
                <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3 w-50">
                <input style={{outline:'none', boxShadow:'none'}} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3 w-50">
                <input style={{outline:'none', boxShadow:'none'}} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating w-50">
                <input style={{outline:'none', boxShadow:'none'}} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label htmlFor="floatingPassword">Confirm password</label>
            </div>
            <div className='text-center mt-5'><button type="submit" className="btn btn-outline-success">Sign Up</button></div>
            <div className='d-flex flex-row justify-content-start w-100'>
                <a className='link-secondary' href='/Login'>Already have an account?</a>
            </div>
        </div>
    </div>
  )
}

export default Registration