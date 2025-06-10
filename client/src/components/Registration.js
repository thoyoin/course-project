import React from 'react'

const Registration = () => {
  return (
    <div className='container-fluid vh-100 text-bg-light d-flex flex-row justify-content-center align-items-center'>
        <div className='container-sm w-25 p-5 border rounded'>
            <div className='text-center mb-5'><h3>Registration</h3></div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Name"/>
                <label for="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Confirm password</label>
            </div>
            <div className='text-center mt-5'><button type="submit" class="btn btn-outline-success">Sign Up</button></div>
        </div>
    </div>
  )
}

export default Registration