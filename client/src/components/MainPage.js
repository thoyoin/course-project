import React from 'react'


const MainPage = () => {
    const name = localStorage.getItem('name')

    return (
        <div className='container-fluid d-flex flex-row justify-content-end align-items-center bg-light position-fixed top-0'>
            <form className="d-flex justify-content-center my-3 mx-auto w-100" role="search">
                <div className='input-group' style={{maxWidth:'600px', height:'40px'}}>
                    <span className='input-group-text rounded-start-4'><i class="bi bi-search p-1"></i></span>
                    <input style={{boxShadow:'none'}} className="form-control rounded-end-4" type="search" placeholder="Search" aria-label="Search"/>
                </div>
            </form>
            <div className='dropdown ms-3 p-0' style={{width:'50px'}}>
                <a data-bs-toggle='dropdown' href='#' className='btn text-success px-2 py-0'>
                    <i className="bi bi-person-circle fs-2 m-0 p-0"></i>
                </a>
                <ul className='dropdown-menu dropdown-menu-end bg-light bg-gradient bg-opacity-50' style={{width:'150px', backdropFilter:'blur(5px)'}}>
                    <li>
                        <p className='text-center my-3 fw-bolder'>Welcome, {name}!</p>
                        <button
                            className='btn btn-outline-success dropdown-item text-center'
                            onClick={()=> {
                                localStorage.removeItem('token');
                                window.location.href = '/';
                            }}
                        >
                            Log out
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MainPage